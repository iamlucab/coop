<?php

require_once 'vendor/autoload.php';

use App\Models\Member;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "Creating required sponsor member (Ruthcil Cabandez - ID: 16)...\n";

try {
    // Check if member 16 already exists
    $existingMember = Member::find(16);
    
    if ($existingMember) {
        echo "✅ Member ID 16 already exists: {$existingMember->full_name}\n";
    } else {
        // Create Ruthcil as member ID 16
        $member = new Member([
            'first_name' => 'Ruthcil',
            'middle_name' => 'Alcazar',
            'last_name' => 'Cabandez',
            'birthday' => '1982-06-13',
            'mobile_number' => '09192222222',
            'occupation' => 'Accountant',
            'address' => 'Door C Alpha 11 Building, Rizal Extension Street, Davao City',
            'photo' => null,
            'role' => 'Member',
            'sponsor_id' => null, // No sponsor for now
            'voter_id' => null,
            'loan_eligible' => 0,
            'status' => 'Approved'
        ]);
        
        // Disable model events to prevent automatic wallet creation
        Member::withoutEvents(function () use ($member) {
            $member->id = 16;
            $member->created_at = '2025-07-15 14:32:02';
            $member->updated_at = '2025-07-15 14:33:33';
            $member->save();
        });
        
        echo "✅ Created member: {$member->full_name} (ID: 16)\n";
        
        // Create corresponding user
        $user = new User([
            'name' => 'Ruthcil Cabandez',
            'mobile_number' => '09192222222',
            'email' => '09192222222@coop.local',
            'role' => 'Member',
            'member_id' => 16,
            'status' => 'Approved',
            'password' => Hash::make('password123')
        ]);
        
        $user->id = 10;
        $user->created_at = '2025-07-15 14:32:02';
        $user->updated_at = '2025-07-15 14:33:33';
        $user->save();
        
        echo "✅ Created user: {$user->name} (ID: 10)\n";
    }
    
    echo "\n🎉 Sponsor member setup completed! You can now run the integration.\n";
    echo "Run: php artisan integrate:specific-members\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}