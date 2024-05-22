<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Category;
use App\Helpers\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Notifications\TaskNotification;
use Illuminate\Support\Facades\Notification;

class TaskController extends Controller
{
    public function index()
    {

        $tasks =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->get();
        return Response::success(["tasks" => $tasks], null, 200);
    }

    public function today()
    {

        $tasks =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->whereDate('due_at', now())->get();
        return Response::success(["tasks" => $tasks], null, 200);
    }
    public function upcoming()
    {
        $tasks =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->whereDate('due_at', '>', now())->get();

        return Response::success(["tasks" => $tasks], null, 200);
    }

    public function category($id)
    {
        $category = Category::find($id);
        $tasks =  Task::with(['tags', 'user', 'subtask', 'category'])->where('user_id', auth()->user()->id)->where('category_id', $id)->get();

        return Response::success(["tasks" => $tasks, 'category' => $category], null, 200);
    }



    public function show($id)
    {

        $task = Task::with('tags', 'user', 'subtask', 'category')->where(['id' => $id, 'user_id' => auth()->user()->id])->first();

        return Response::success(["task" => $task], null, 200);
    }

    public function search($title)
    {
        $task = Task::with('tags', 'user', 'subtask', 'category')->where('title', 'like', '%' . $title . '%')->where('user_id', auth()->user()->id)->get();
        return Response::success(["task" => $task], null, 200);
    }

    public function store(Request $request)
    {

        $inputs = $request->validate([
            'title' => ['required'],
            // 'description' => ['required'],
            'due_at' => ['required', 'date'],
            'category_id' => ['required'],
            'tag_id' => ['required'],
        ]);


        $inputs['user_id'] = auth()->id();
        $task = Task::create($inputs);
        $task->tags()->attach($request->tag_id);

        return Response::success(["task" => $task], 'Task created successfully', 200);
    }



    public function update(Request $request, $id)
    {
        Log::info($request);
        $task = Task::find($id);

        $this->authorize('update', [$task]);
        $inputs = $request->validate([
            'title' => ['required'],
            // 'description' => ['required'],
            'due_at' => ['required', 'date'],
            'category_id' => ['required'],
            'tag_id' => ['required'],
        ]);
        $inputs['category_id'] = $request->category_id;
        $inputs['user_id'] = auth()->id();


        $task->update($inputs);
        $task->tags()->wherePivot('task_id', $id)->detach();
        $task->tags()->attach($request->tag_id);
        return Response::success(["task" => $task], 'Task updated successfully', 200);
    }



    public function update_status($id)
    {
        $subtask = Task::find($id);
        $this->authorize('update', [$subtask]);
        $subtask->is_completed = !$subtask->is_completed;
        $subtask->save();
        return Response::success(["subtask" => $subtask], 'Task updated successfully', 200);
    }

    public function destroy($id)
    {

        $task = Task::find($id);
        $this->authorize('delete', [$task]);


        $task->delete();
        return Response::success(null, 'Task deleted successfully', 200);
    }
}
