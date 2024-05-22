<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Tag;
use App\Models\Task;
use App\Models\User;
use App\Models\Subtask;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        // User::where('username', 'darwannn')->delete();
        // User::create([
        //     'first_name' => 'Darwin',
        //     'last_name' => 'Ramos',
        //     'email' => 'darwinsanluis.ramos14@gmail.com',
        //     'password' => bcrypt('1'),
        //     'username' => "darwannn",
        //     'email_verified_at' => now(),

        // ]);
        User::factory(5)->create();
        Category::factory(20)->create();
        Tag::factory(20)->create();
        Task::factory(20)->create();
        Subtask::factory(20)->create();
    }
}
