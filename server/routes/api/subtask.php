
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubtaskController;

Route::group(['prefix' => 'subtask'], function () {
    Route::group(['middleware' => ['auth:sanctum',]], function () {
        Route::get('/{id}', [SubtaskController::class, 'index']);
        Route::post('/{id}', [SubtaskController::class, 'store']);
        Route::put('/{id}', [SubtaskController::class, 'update_status']);
        Route::delete('/{id}', [SubtaskController::class, 'destroy']);
    });
});
