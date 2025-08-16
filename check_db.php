<?php
try {
    // Database configuration
    $host = '127.0.0.1';
    $dbname = 'ebili';
    $username = 'root';
    $password = '';

    echo "Attempting to connect to database...\n";
    
    // Connect to database with error reporting
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "Connected to database successfully!\n";
    
    // Check MySQL version
    $stmt = $pdo->query('SELECT VERSION() as version');
    $row = $stmt->fetch();
    echo "MySQL Version: " . $row['version'] . "\n";
    
    // List all tables
    echo "\nChecking tables in database:\n";
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll();
    
    if (count($tables) > 0) {
        echo "Found " . count($tables) . " tables:\n";
        foreach ($tables as $table) {
            $tableName = reset($table);
            echo "  - $tableName\n";
        }
    } else {
        echo "No tables found in database\n";
    }
    
    // Check if specific tables exist
    $importantTables = ['members', 'users', 'products', 'categories'];
    echo "\nChecking important tables:\n";
    foreach ($importantTables as $table) {
        $stmt = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmt->execute([$table]);
        if ($stmt->rowCount() > 0) {
            // Count records in table
            $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
            $countRow = $countStmt->fetch();
            echo "  ✓ $table ({$countRow['count']} records)\n";
        } else {
            echo "  ✗ $table (not found)\n";
        }
    }
    
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "General Error: " . $e->getMessage() . "\n";
}
?>