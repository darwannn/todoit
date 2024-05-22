<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalendarController;

Route::group(['prefix' => 'calendar'], function () {

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/count', [CalendarController::class, 'count']);
    });
});
    