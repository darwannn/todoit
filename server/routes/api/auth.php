<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->middleware(['guest']);

    Route::post('/forgot-password', [AuthController::class, 'forgot_password']);
    Route::put('/new-password/{token}/{id}', [AuthController::class, 'new_password']);
    Route::put('/verify/{token}/{id}', [AuthController::class, 'verify']);
    Route::put('/activate/{token}/{id}', [AuthController::class, 'activate']);

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
