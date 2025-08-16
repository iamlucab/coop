<?php
$oldName = 'database/migrations/2023_07_26_000000_add_payment_fields_to_loan_payments_table.php';
$newName = 'database/migrations/2025_06_19_040133_add_payment_fields_to_loan_payments_table.php';

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