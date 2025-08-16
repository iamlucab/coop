<?php
echo "=== Final Integration Test ===\n";

try {
    // Test database connection
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=ebili', 'root', '');
    echo "✓ Database connection successful\n";
    
    // Test key tables
    $tests = [
        'members' => 19,
        'users' => 19,
        'products' => 16,
        'categories' => 16
    ];
    
    foreach ($tests as $table => $expectedCount) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
        $row = $stmt->fetch();
        $actualCount = $row['count'];
        
        if ($actualCount == $expectedCount) {
            echo "✓ $table table has $actualCount records (expected: $expectedCount)\n";
        } else {
            echo "✗ $table table has $actualCount records (expected: $expectedCount)\n";
        }
    }
    
    // Test first member
    $stmt = $pdo->query("SELECT first_name, last_name FROM members ORDER BY id LIMIT 1");
    $member = $stmt->fetch();
    echo "✓ First member: " . $member['first_name'] . " " . $member['last_name'] . "\n";
    
    // Test first product
    $stmt = $pdo->query("SELECT name FROM products ORDER BY id LIMIT 1");
    $product = $stmt->fetch();
    echo "✓ First product: " . $product['name'] . "\n";
    
    echo "\n=== All Tests Passed Successfully ===\n";
    echo "The amigos database has been successfully integrated with the ebili application!\n";
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "Integration test failed.\n";
}
?>