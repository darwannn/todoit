
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

Route::group(['prefix' => 'notification'], function () {
    Route::group(['middleware' => ['auth:sanctum',]], function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::put('/', [NotificationController::class, 'update']);
    });
});
