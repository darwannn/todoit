<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\Tag; // Add this line
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class TaskFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' => $this->faker->sentence(2),
            'description' => $this->faker->sentence(10),
            'due_at' => Carbon::now()->addDays(rand(1, 7)),
            'is_completed' => $this->faker->boolean,

            'category_id' => Category::all()->random()->id,
            'user_id' => User::all()->random()->id,
        ];
    }
}
