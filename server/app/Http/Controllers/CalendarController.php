<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Helpers\Response;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function count()
    {

        $today =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->where('is_completed', false)->whereDate('due_at', now())->count();
        $upcoming =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->where('is_completed', false)->whereDate('due_at', '>', now())->count();
        $all = Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->where('is_completed', false)->count();
        return Response::success(["tasks" => ['all' => $all, 'upcoming' => $upcoming, 'today' => $today]], null, 200);
    }
}
