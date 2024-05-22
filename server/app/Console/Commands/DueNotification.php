<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use Illuminate\Console\Command;
use App\Notifications\TaskNotification;
use Illuminate\Support\Facades\Notification;
use App\Notifications\TaskDueTodayNotification;

class DueNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:due-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify users of tasks due today';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get all users
        $users = User::with(['task' => function ($query) {
            $query->where('due_at', Carbon::today());
        }])->get();

        // Loop through each user
        foreach ($users as $user) {
            $dueTasks = $user->task;

            // If user has due tasks, notify them
            if ($dueTasks->isNotEmpty()) {
                $notification = [
                   
                    'to' => $user->email,
                    'name' => "{$user->first_name} {$user->last_name}",
                    'subject' => 'Tasks Due Today',
                    // 'body' => 'You have tasks due today. Click the link below to view them.',
                    'task_count' => $dueTasks->count(),
                    'tasks' => $dueTasks->pluck('title')->toArray(),
                    'link' => env("CLIENT_BASE_URL") . '/today',
                ];

                $user->notify(new TaskNotification($notification));
            }
        }
    }
}
