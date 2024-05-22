<?php

namespace App\Providers;

use Laravel\Sanctum\Sanctum;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::$accessTokenAuthenticationCallback = function ($accessToken, $isValid) {
            $is_unused = !$accessToken->last_used_at || $accessToken->last_used_at->gte(now()->subHours(1));
            if (!$is_unused) {
                $accessToken->delete();
            }
            return  $is_unused;
        };
    }
}
