<?php
// WARNING: Delete this file after running it.
use Illuminate\Support\Facades\Artisan;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->handle(
    $request = Illuminate\Http\Request::capture(),
    new Illuminate\Console\OutputStyle(
        new Symfony\Component\Console\Input\ArgvInput,
        new Symfony\Component\Console\Output\ConsoleOutput
    )
);

// Run clear commands
Artisan::call('config:clear');
Artisan::call('cache:clear');
Artisan::call('route:clear');
Artisan::call('view:clear');
echo "Cleared config, cache, route, and view successfully.";

// Optionally re-cache config
Artisan::call('config:cache');
echo "<br>Rebuilt config cache.";
