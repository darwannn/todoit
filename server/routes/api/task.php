
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::group(['prefix' => 'task',], function () {
    Route::group(['middleware' => ['auth:sanctum',]], function () {
        Route::get('/', [TaskController::class, 'index']);
        Route::get('/today', [TaskController::class, 'today']);
        Route::get('/upcoming', [TaskController::class, 'upcoming']);
        Route::get('/category/{id}', [TaskController::class, 'category']);
        Route::get('/{id}', [TaskController::class, 'show']);
        Route::get('/search/{title}', [TaskController::class, 'search']);
        Route::post('/', [TaskController::class, 'store']);
        Route::put('/update/status/{id}', [TaskController::class, 'update_status']);
        Route::put('/{id}', [TaskController::class, 'update']);
        Route::patch('/{id}', [SubtaskController::class, 'update_status']);
        Route::delete('/{id}', [TaskController::class, 'destroy']);
    });
});
