<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Helpers\Response;
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    public function index($id)
    {
        $subtasks =  Subtask::where('user_id', auth()->user())->where('task_id', $id)->get();
        return Response::success(["subtasks" => $subtasks], null, 200);
    }

    public function store(Request $request, $id)
    {

        $inputs = $request->validate([
            'title' => ['required'],
        ]);

        $inputs['task_id'] = $id;
        $task = Subtask::create($inputs);
        return Response::success(["task" => $task], 'Task created successfully', 200);
    }

    public function update(Request $request, $id)
    {
        $subtask = Subtask::find($id);


        $inputs = $request->validate([
            'title' => ['required'],
        ]);

        $subtask->update($inputs);

        return Response::success(["subtask" => $subtask], 'Task updated successfully', 200);
    }

    public function update_status($id)
    {
        $subtask = Subtask::find($id);
     
        $subtask->is_completed = !$subtask->is_completed;
        $subtask->save();
        return Response::success(["subtask" => $subtask], 'Subtask updated successfully', 200);
    }

    public function destroy($id)
    {

        $subtask = Subtask::find($id);
      
        $subtask->delete();
        return Response::success(null, 'Task deleted successfully', 200);
    }
}
