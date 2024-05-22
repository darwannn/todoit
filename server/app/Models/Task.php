<?php

namespace App\Models;

use App\Models\Tag;
use App\Models\User;
use App\Models\Subtask;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'due_at', 'is_completed', 'user_id', 'category_id'];
    public $table = 'tasks';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function subtask()
    {
        return $this->hasMany(Subtask::class);
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
