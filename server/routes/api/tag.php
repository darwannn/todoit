
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;

Route::group(['prefix' => 'tag'], function () {
    Route::group(['middleware' => ['auth:sanctum',]], function () {
        Route::get('/', [TagController::class, 'index']);
        Route::post('/', [TagController::class, 'store']);
        Route::put('/{id}', [TagController::class, 'update']);
        Route::delete('/{id}', [TagController::class, 'destroy']);
    });
});
