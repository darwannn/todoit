<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (Throwable $exception, $request) {
            if ($exception instanceof ValidationException) {
                return $this->invalidJson($request, $exception);
            }

            if ($request->is('api/*')) {
                return response()->json([
                    'status' => "error",
                    'message' => $exception->getMessage(),
                ], 500);
            }
        });
    }

    /**
     * Convert a validation exception into a JSON response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Validation\ValidationException  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        return response()->json([
            'status'    => "error",

            'errors'  => $this->transformErrors($exception),

        ], $exception->status);
    }

    // transform the error messages,
    private function transformErrors(ValidationException $exception)
    {
        $errors = [];

        foreach ($exception->errors() as $field => $messages) {
            $errors[$field] = $messages[0];
        }

        return $errors;
    }
}
