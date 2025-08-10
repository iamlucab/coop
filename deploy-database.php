#!/usr/bin/env php
<?php
/**
 * Database Deployment Script for Ebili Laravel Application
 * 
 * Usage:
 *   php deploy-database.php [options]
 * 
 * Options:
 *   --test       Test database connections only
 *   --status     Show database deployment status
 *   --compare    Compare local and remote database schemas
 *   --export     Export local database schema to SQL file
 *   --dry-run    Show what would be deployed without making changes
 *   --backup     Create backup before deployment (default: true)
 *   --no-backup  Skip backup creation
 *   --help       Show this help message
 */

// Include the database deployer class
require_once __DIR__ . '/DatabaseDeployer.php';

// Load configuration
if (!file_exists(__DIR__ . '/database-config.php')) {
    echo "Error: database-config.php not found. Please configure your database settings.\n";
    exit(1);
}

$config = require __DIR__ . '/database-config.php';

// Parse command line arguments
$options = getopt('', ['test', 'status', 'compare', 'export', 'dry-run', 'backup', 'no-backup', 'help']);

// Show help
if (isset($options['help'])) {
    showHelp();
    exit(0);
}

// Initialize database deployer
$deployer = new DatabaseDeployer($config);

try {
    // Test connections
    if (isset($options['test'])) {
        echo "Testing Database Connections\n";
        echo str_repeat('=', 50) . "\n";
        
        if ($deployer->testConnections()) {
            echo "\n✅ Database connection test successful!\n";
            echo "You can now deploy database changes.\n";
        } else {
            echo "\n❌ Database connection test failed!\n";
            echo "Please check your database credentials in database-config.php\n";
            exit(1);
        }
        exit(0);
    }
    
    // Show status
    if (isset($options['status'])) {
        echo "Database Deployment Status\n";
        echo str_repeat('=', 50) . "\n";
        
        $status = $deployer->getStatus();
        
        if (isset($status['error'])) {
            echo "❌ Error: " . $status['error'] . "\n";
            exit(1);
        }
        
        echo "New tables to create: " . $status['new_tables'] . "\n";
        echo "Tables with differences: " . $status['table_differences'] . "\n";
        echo "Pending migrations: " . $status['pending_migrations'] . "\n";
        
        if (!empty($status['details']['new_tables'])) {
            echo "\nNew tables:\n";
            foreach ($status['details']['new_tables'] as $table) {
                echo "  + {$table}\n";
            }
        }
        
        if (!empty($status['details']['modified_tables'])) {
            echo "\nModified tables:\n";
            foreach ($status['details']['modified_tables'] as $table) {
                echo "  ~ {$table}\n";
            }
        }
        
        if (!empty($status['details']['pending_migrations'])) {
            echo "\nPending migrations:\n";
            foreach ($status['details']['pending_migrations'] as $migration) {
                echo "  → {$migration}\n";
            }
        }
        
        exit(0);
    }
    
    // Compare schemas
    if (isset($options['compare'])) {
        echo "Comparing Database Schemas\n";
        echo str_repeat('=', 50) . "\n";
        
        $differences = $deployer->compareSchemas();
        
        if (!$differences) {
            echo "❌ Failed to compare schemas\n";
            exit(1);
        }
        
        if (empty($differences['new_tables']) && empty($differences['table_differences'])) {
            echo "✅ No differences found between local and remote databases\n";
        } else {
            if (!empty($differences['new_tables'])) {
                echo "📋 New tables in local database:\n";
                foreach ($differences['new_tables'] as $table) {
                    echo "  + {$table}\n";
                }
                echo "\n";
            }
            
            if (!empty($differences['missing_tables'])) {
                echo "⚠️  Tables in remote but not in local:\n";
                foreach ($differences['missing_tables'] as $table) {
                    echo "  - {$table}\n";
                }
                echo "\n";
            }
            
            if (!empty($differences['table_differences'])) {
                echo "🔄 Tables with structural differences:\n";
                foreach ($differences['table_differences'] as $table => $diff) {
                    echo "  ~ {$table}\n";
                }
                echo "\n";
            }
        }
        
        exit(0);
    }
    
    // Export schema
    if (isset($options['export'])) {
        echo "Exporting Database Schema\n";
        echo str_repeat('=', 50) . "\n";
        
        $outputFile = $deployer->exportSchema();
        
        if ($outputFile) {
            echo "✅ Schema exported successfully to: {$outputFile}\n";
            echo "You can use this file to manually update your remote database.\n";
        } else {
            echo "❌ Failed to export schema\n";
            exit(1);
        }
        
        exit(0);
    }
    
    // Perform database deployment
    $dryRun = isset($options['dry-run']);
    $backup = !isset($options['no-backup']);
    
    echo "Ebili Database Deployment\n";
    echo str_repeat('=', 50) . "\n";
    echo "Local Database: {$config['local']['database']}\n";
    echo "Remote Database: {$config['remote']['database']}\n";
    
    if ($dryRun) {
        echo "Mode: DRY RUN (no changes will be made)\n";
    } else {
        echo "Mode: LIVE DEPLOYMENT\n";
        
        if ($backup) {
            echo "Backup: ENABLED\n";
        } else {
            echo "Backup: DISABLED\n";
        }
        
        // Confirmation for live deployment
        echo "\n⚠️  This will modify your production database.\n";
        echo "Are you sure you want to continue? (y/N): ";
        $handle = fopen("php://stdin", "r");
        $line = fgets($handle);
        fclose($handle);
        
        if (trim(strtolower($line)) !== 'y') {
            echo "Database deployment cancelled.\n";
            exit(0);
        }
    }
    
    echo "\n" . str_repeat('-', 50) . "\n";
    
    // Start deployment
    $success = $deployer->deploy([
        'dry_run' => $dryRun,
        'backup' => $backup
    ]);
    
    echo "\n" . str_repeat('-', 50) . "\n";
    
    if ($success) {
        if ($dryRun) {
            echo "✅ Dry run completed successfully!\n";
            echo "Run without --dry-run to perform actual deployment.\n";
        } else {
            echo "✅ Database deployment completed successfully!\n";
            
            // Show post-deployment notes
            showPostDeploymentNotes();
        }
    } else {
        echo "❌ Database deployment completed with errors!\n";
        echo "Please check the logs above and fix any issues.\n";
        exit(1);
    }
    
} catch (Exception $e) {
    echo "\n❌ Database deployment failed: " . $e->getMessage() . "\n";
    exit(1);
} finally {
    $deployer->disconnect();
}

/**
 * Show help message
 */
function showHelp() {
    echo "Ebili Database Deployment Script\n";
    echo str_repeat('=', 50) . "\n";
    echo "Usage: php deploy-database.php [options]\n\n";
    echo "Options:\n";
    echo "  --test       Test database connections only\n";
    echo "  --status     Show database deployment status\n";
    echo "  --compare    Compare local and remote database schemas\n";
    echo "  --export     Export local database schema to SQL file\n";
    echo "  --dry-run    Show what would be deployed without making changes\n";
    echo "  --backup     Create backup before deployment (default: true)\n";
    echo "  --no-backup  Skip backup creation\n";
    echo "  --help       Show this help message\n\n";
    echo "Examples:\n";
    echo "  php deploy-database.php --test           # Test connections\n";
    echo "  php deploy-database.php --status         # Show status\n";
    echo "  php deploy-database.php --compare        # Compare schemas\n";
    echo "  php deploy-database.php --export         # Export schema\n";
    echo "  php deploy-database.php --dry-run        # Preview deployment\n";
    echo "  php deploy-database.php                  # Deploy to live database\n\n";
    echo "Configuration:\n";
    echo "  Edit database-config.php to configure database connections.\n";
}

/**
 * Show post-deployment notes
 */
function showPostDeploymentNotes() {
    echo "\n📋 Post-Database Deployment Notes:\n";
    echo str_repeat('-', 35) . "\n";
    echo "1. Verify all tables were created/updated correctly\n";
    echo "2. Check that data integrity is maintained\n";
    echo "3. Test critical application features\n";
    echo "4. Monitor application logs for database errors\n";
    echo "5. Consider running data migrations if needed\n";
    echo "\n💡 If you have SSH access to your server, you may want to run:\n";
    echo "   - php artisan migrate (for any remaining Laravel migrations)\n";
    echo "   - php artisan db:seed (if you need to seed new data)\n";
    echo "   - php artisan config:cache\n";
    echo "\n⚠️  Important: Always test your application thoroughly after database changes!\n";
}