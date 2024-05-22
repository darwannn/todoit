<?php

namespace App\Helpers;

class Response
{
    public static function success($data = null, $message = null, $statusCode = 200)
    {
        $responseData = ['status' => 'success'];

        if ($message !== null) {
            $responseData['message'] = $message;
        }

        if ($data !== null) {
            $responseData['data'] = $data;
        }

        return response()->json($responseData, $statusCode);
    }

    public static function error($message = "Internal Server Error", $statusCode = 500)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], $statusCode);
    }
}
