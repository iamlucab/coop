<?php
$oldName = 'database/migrations/2024_01_29_add_created_by_to_products_table.php';
$newName = 'database/migrations/2025_07_11_220960_add_created_by_to_products_table.php';

if (file_exists($oldName)) {
    if (rename($oldName, $newName)) {
        echo "File renamed successfully\n";
    } else {
        echo "Error renaming file\n";
    }
} else {
    echo "File not found: $oldName\n";
}
?>