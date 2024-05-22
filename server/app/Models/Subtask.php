<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subtask extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'is_completed', 'task_id'];
    public $table = 'subtasks';

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
