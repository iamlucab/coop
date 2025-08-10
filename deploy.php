<?php
namespace Deployer;

require 'recipe/common.php'; // No Laravel recipe needed for FTP

set('application', 'coop');
set('allow_anonymous_stats', false);

// Local project path (your Laravel app in XAMPP)
set('local_path', 'C:/xampp/htdocs/coop/');

// Remote server details (v6 syntax)
host('production')
    ->hostname('ftp.amigostayo.com')              // v6 uses hostname()
    ->user('deployer@amigostayo.com')             // v6 uses user()
    ->password('2_i@29qr.vcW')                    // v6 uses password()
    ->set('deploy_path', 'public_html/coop');     // Path on GoDaddy

// Task: Upload changed files only
task('upload', function () {
    $localPath = get('local_path');
    $remotePath = get('deploy_path');

    upload($localPath, $remotePath, [
        'options' => [
            '--exclude=.git',
            '--exclude=node_modules',
            '--exclude=vendor',
            '--exclude=.env',
            '--exclude=storage/framework/cache/*',
        ]
    ]);
});

// Default deploy task
task('deploy', [
    'upload',
]);
