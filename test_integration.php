<?php
// Test script to verify the integration is working correctly

require_once 'vendor/autoload.php';

// Bootstrap Laravel
require_once 'bootstrap/app.php';

use App\Models\Member;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;

try {
    echo "Testing database integration...\n";
    
    // Test 1: Check if we can access the Member model
    echo "Test 1: Accessing Member model...\n";
    $memberCount = Member::count();
    echo "  Found $memberCount members\n";
    
    // Get first member
    $firstMember = Member::first();
    if ($firstMember) {
        echo "  First member: " . $firstMember->first_name . " " . $firstMember->last_name . "\n";
    }
    
    // Test 2: Check if we can access the User model
    echo "Test 2: Accessing User model...\n";
    $userCount = User::count();
    echo "  Found $userCount users\n";
    
    // Get first user
    $firstUser = User::first();
    if ($firstUser) {
        echo "  First user: " . $firstUser->name . " (" . $firstUser->email . ")\n";
    }
    
    // Test 3: Check if we can access the Product model
    echo "Test 3: Accessing Product model...\n";
    $productCount = Product::count();
    echo "  Found $productCount products\n";
    
    // Get first product
    $firstProduct = Product::first();
    if ($firstProduct) {
        echo "  First product: " . $firstProduct->name . " (₱" . $firstProduct->price . ")\n";
    }
    
    // Test 4: Check if we can access the Category model
    echo "Test 4: Accessing Category model...\n";
    $categoryCount = Category::count();
    echo "  Found $categoryCount categories\n";
    
    // Get first category
    $firstCategory = Category::first();
    if ($firstCategory) {
        echo "  First category: " . $firstCategory->name . "\n";
    }
    
    echo "\nAll tests completed successfully!\n";
    echo "The integration is working correctly.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Integration test failed.\n";
}
?>