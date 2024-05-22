
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::group(['prefix' => 'category'], function () {
    Route::group(['middleware' => ['auth:sanctum',]], function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });
});
