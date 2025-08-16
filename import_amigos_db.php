<?php
// Database configuration
$host = '127.0.0.1';
$dbname = 'ebili';
$username = 'root';
$password = '';

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to database successfully\n";
    
    // Read the SQL file
    $sql = file_get_contents('amigos-augu16.sql');
    
    // Remove the database creation line since we're using existing database
    $sql = preg_replace('/^.*CREATE DATABASE.*$/m', '', $sql);
    $sql = preg_replace('/^.*USE.*$/m', '', $sql);
    
    // Split the SQL into individual statements
    $statements = explode(';', $sql);
    
    $success = 0;
    $errors = 0;
    
    // Execute each statement
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            try {
                $pdo->exec($statement);
                $success++;
            } catch (PDOException $e) {
                // Ignore errors for now, we'll check what's important later
                $errors++;
            }
        }
    }
    
    echo "Database import completed!\n";
    echo "Successful statements: $success\n";
    echo "Failed statements: $errors\n";
    
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

?>