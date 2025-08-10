<?php
/**
 * Deployment Configuration for GoDaddy Hosting
 * Domain: https://www.ebili.online
 * Points to: public_html/ebili
 */

return [
    // GoDaddy FTP Configuration
    'ftp' => [
        'host' => 'ebili.online',
        'username' => 'admin@ebili.online',
        'password' => '!@#Decoded123',
        'port' => 21,
        'ssl' => false, // Set to true for FTPS if available
        'passive' => true
    ],
    
    // Paths
    'local_path' => __DIR__,
    'remote_path' => 'public_html/ebili',
    
    // Files/directories to exclude from deployment
    'exclude' => [
        '.git/',
        'node_modules/',
        'vendor/',
        'storage/logs/',
        'storage/framework/cache/',
        'storage/framework/sessions/',
        'storage/framework/views/',
        'storage/app/public/temp/',
        '.env',
        '.env.example',
        '.env.local',
        '.env.production',
        'deploy.php',
        'deploy-config.php',
        'deploy-config.example.php',
        'GoDaddyDeployer.php',
        'last_deploy.json',
        'README.md',
        'composer.lock',
        'package-lock.json',
        'yarn.lock',
        'phpunit.xml',
        'tests/',
        'docs/',
        '.gitignore',
        '.gitattributes',
        '.editorconfig',
        '.styleci.yml',
        'webpack.mix.js',
        'vite.config.js',
        'tailwind.config.js',
        'postcss.config.js',
        'artisan',
        '*.log',
        'EbiliMobile/',
        'android/',
        'Assets.xcassets/',
        'playstore.png',
        // Integration scripts (keep local only)
        'check_current_data.php',
        'integrate_ebili_data.php',
        'integrate_transactions_and_bonuses.php',
        'integrate_orders_and_products.php',
        'run_full_integration.php',
        'reset_for_production.php'
    ],
    
    // File extensions to include (empty array means all files)
    'include_extensions' => [
        'php', 'js', 'css', 'html', 'blade.php', 'json', 'xml',
        'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'webp',
        'ttf', 'woff', 'woff2', 'eot',
        'txt', 'md', 'htaccess'
    ],
    
    // Backup settings
    'backup' => [
        'enabled' => true,
        'keep_backups' => 5 // Number of backups to keep
    ],
    
    // Laravel specific settings
    'laravel' => [
        // Commands to run after deployment (if you have SSH access)
        'post_deploy_commands' => [
            'php artisan config:cache',
            'php artisan route:cache',
            'php artisan view:cache',
            'php artisan storage:link'
        ],
        
        // Files that need special handling
        'production_files' => [
            '.env.production' => '.env' // Copy .env.production to .env on server
        ]
    ]
];