
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\User;

Route::group(['prefix' => 'user', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::put('/email', [UserController::class, 'update_email']);
    Route::put('/verify-email/{token}/{email}/{id}', [UserController::class, 'verify_email']);
    Route::put('/username', [UserController::class, 'update_username']);
    Route::put('/profile', [UserController::class, 'update_profile']);
    Route::put('/avatar', [UserController::class, 'update_avatar']);
    Route::put('/password', [UserController::class, 'update_password']);
});
