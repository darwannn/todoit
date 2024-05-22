<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Category;
use App\Helpers\Response;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories =  Category::with(['tasks'])->where('user_id', auth()->user()->id)->get();
        return Response::success(["category" => $categories], null, 200);
    }


    public function store(Request $request)
    {
        // $inputs = $request->validate([
        //     'id' => ['required'],
        //     'color' => ['required'],

        // ]);

        // $inputs['user_id'] = auth()->user()->id;
        $category = Category::create([
            'title' => "Untitled",
            'color' => "#000000",
            'user_id' => auth()->user()->id
        ]);
        return Response::success(["category" => $category], 'Category created successfully', 200);
    }
    public function update(Request $request, $id)
    {

        $category = Category::find($id);
        $inputs = $request->validate([
            'title' => ['required'],
            'color' => ['required'],

        ]);

        $inputs['user_id'] = auth()->user()->id;
        $category->update($inputs);
        return Response::success(["category" => $category], 'Category updated successfully', 200);
    }

    public function destroy($id)
    {

        $category = Category::find($id);
        //$this->authorize('view', [$category]);


        $category->delete();
        return Response::success(null, 'Category deleted successfully', 200);
    }
}
