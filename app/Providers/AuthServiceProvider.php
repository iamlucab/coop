<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */


     
 public function boot()
{
    $this->registerPolicies();

    // Admin-only menu access
    Gate::define('admin-only', function ($user) {
        return $user->role === 'Admin';
    });

    // Staff-only menu access (includes Admin)
    Gate::define('staff-only', function ($user) {
        return $user->role === 'Staff' || $user->role === 'Admin';
    });

    // Member-only menu access
    Gate::define('member-only', function ($user) {
        return $user->role === 'Member';
    });
}



}
