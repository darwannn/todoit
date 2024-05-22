<?php

namespace App\Http\Controllers;

use App\Helpers\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {

        if (auth()->check()) {
            $notifications = auth()->user()->notifications()->paginate(2);


            // $notifications = DB::table('notifications')->where('notifiable_id', auth()->user()->id)->paginate(2);
            return Response::success(['notifications' => $notifications], null);
        } else {
            return Response::error('Unauthorized', 401);
        }
    }

    public function update()
    {
        auth()->user()->unreadNotifications->markAsRead();
        return Response::success(null, null);
    }
}
