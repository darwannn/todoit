<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Helpers\Response;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags =  Tag::where('user_id', auth()->user()->id)->get();
        return Response::success(["tags" => $tags], null, 200);
    }

    public function store(Request $request)
    {
        $inputs = $request->validate([
            'title' => ['required'],
            'color' => ['required'],

        ]);

        $inputs['user_id'] = auth()->user()->id;
        $tag = Tag::create($inputs);
        return Response::success(["tag" => $tag], 'Tag created successfully', 200);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::find($id);
        $this->authorize('update', [$tag]);
        $inputs = $request->validate([
            'title' => ['required'],
            'color' => ['required'],
        ]);

        $tag->update($inputs);
        return Response::success(["tag" => $tag], 'Tag updated successfully', 200);
    }
    public function destroy(Request $request, $id)
    {

        $tag = Tag::find($id);
        $this->authorize('delete', [$tag]);


        $tag->delete();
        return Response::success(null, 'Tag deleted successfully', 200);
    }
}
