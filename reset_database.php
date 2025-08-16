<?php
try {
    // Connect to MySQL without specifying a database
    $pdo = new PDO('mysql:host=127.0.0.1', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Drop and recreate the database
    $pdo->exec("DROP DATABASE IF EXISTS ebili");
    $pdo->exec("CREATE DATABASE ebili");
    
    echo "Database reset successfully\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>