<?php

require_once 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

// Initialize database connection
$capsule = new Capsule;
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => '127.0.0.1',
    'database' => 'ebili',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

try {
    $pdo = $capsule->getConnection()->getPdo();
    
    // Read the SQL file
    $sql = file_get_contents('amigos-latest.sql');
    
    // Split the SQL into individual statements
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    
    echo "Starting database seeding...\n";
    
    // Disable foreign key checks
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
    
    $successCount = 0;
    $errorCount = 0;
    
    foreach ($statements as $statement) {
        if (empty($statement) || strpos($statement, '--') === 0 || strpos($statement, '/*') === 0) {
            continue;
        }
        
        try {
            // Skip CREATE TABLE statements if tables exist, focus on INSERT statements
            if (stripos($statement, 'CREATE TABLE') === 0) {
                // Extract table name
                preg_match('/CREATE TABLE `?(\w+)`?/i', $statement, $matches);
                if (isset($matches[1])) {
                    $tableName = $matches[1];
                    
                    // Check if table exists
                    $result = $pdo->query("SHOW TABLES LIKE '$tableName'");
                    if ($result->rowCount() > 0) {
                        echo "Table '$tableName' already exists, skipping creation...\n";
                        continue;
                    }
                }
            }
            
            // Handle INSERT statements - replace existing data
            if (stripos($statement, 'INSERT INTO') === 0) {
                // Extract table name from INSERT statement
                preg_match('/INSERT INTO `?(\w+)`?/i', $statement, $matches);
                if (isset($matches[1])) {
                    $tableName = $matches[1];
                    
                    // Clear existing data from the table
                    $pdo->exec("DELETE FROM `$tableName`");
                    echo "Cleared existing data from table '$tableName'\n";
                }
                
                // Convert INSERT INTO to INSERT IGNORE to handle any conflicts
                $statement = str_ireplace('INSERT INTO', 'INSERT IGNORE INTO', $statement);
            }
            
            $pdo->exec($statement);
            $successCount++;
            
        } catch (PDOException $e) {
            echo "Error executing statement: " . $e->getMessage() . "\n";
            echo "Statement: " . substr($statement, 0, 100) . "...\n\n";
            $errorCount++;
        }
    }
    
    // Re-enable foreign key checks
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');
    
    echo "\nDatabase seeding completed!\n";
    echo "Successful statements: $successCount\n";
    echo "Failed statements: $errorCount\n";
    
} catch (Exception $e) {
    echo "Database connection error: " . $e->getMessage() . "\n";
}