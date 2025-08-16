<?php
try {
    // Database configuration
    $host = '127.0.0.1';
    $dbname = 'ebili';
    $username = 'root';
    $password = '';

    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "Connected to database successfully!\n";
    
    // Get list of all migrations from the filesystem
    $migrationsPath = 'database/migrations';
    $migrationFiles = [];
    
    if (is_dir($migrationsPath)) {
        $files = scandir($migrationsPath);
        foreach ($files as $file) {
            if (preg_match('/^(\d{4}_\d{2}_\d{2}_\d{6})_(.+)\.php$/', $file, $matches)) {
                $migrationFiles[] = [
                    'file' => $file,
                    'timestamp' => $matches[1],
                    'name' => $matches[2]
                ];
            }
        }
    }
    
    echo "Found " . count($migrationFiles) . " migration files\n";
    
    // Check what's already in the migrations table
    $stmt = $pdo->query('SELECT migration FROM migrations');
    $existingMigrations = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "Found " . count($existingMigrations) . " existing migrations in database\n";
    
    // Add missing migrations to the migrations table
    $added = 0;
    $batch = 1; // Use batch 1 for all migrations
    
    foreach ($migrationFiles as $migration) {
        $migrationName = $migration['timestamp'] . '_' . $migration['name'];
        
        // Check if migration already exists
        if (!in_array($migrationName, $existingMigrations)) {
            // Add migration to database
            $stmt = $pdo->prepare('INSERT INTO migrations (migration, batch) VALUES (?, ?)');
            $stmt->execute([$migrationName, $batch]);
            echo "Added migration: $migrationName\n";
            $added++;
        }
    }
    
    echo "Added $added new migrations to the migrations table\n";
    
    // Now check the status using artisan command
    echo "\nChecking migration status...\n";
    echo shell_exec('php artisan migrate:status');
    
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "General Error: " . $e->getMessage() . "\n";
}
?>