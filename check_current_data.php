<?php
require_once 'vendor/autoload.php';

// Load Laravel environment
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Member;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;

echo "=== CURRENT DATABASE STATE ===\n\n";

echo "Current Members:\n";
$members = Member::select('id', 'first_name', 'last_name', 'mobile_number')->get();
foreach ($members as $member) {
    echo "ID: {$member->id} - {$member->first_name} {$member->last_name} ({$member->mobile_number})\n";
}

echo "\nCurrent Users:\n";
$users = User::select('id', 'name', 'mobile_number', 'member_id')->get();
foreach ($users as $user) {
    echo "ID: {$user->id} - {$user->name} ({$user->mobile_number}) - Member ID: {$user->member_id}\n";
}

echo "\nCurrent Wallets:\n";
$wallets = Wallet::select('id', 'wallet_id', 'member_id', 'type', 'balance')->get();
foreach ($wallets as $wallet) {
    echo "ID: {$wallet->id} - {$wallet->wallet_id} - Member: {$wallet->member_id} - Type: {$wallet->type} - Balance: {$wallet->balance}\n";
}

echo "\nTotal Wallet Transactions: " . WalletTransaction::count() . "\n";

echo "\n=== END CURRENT STATE ===\n";