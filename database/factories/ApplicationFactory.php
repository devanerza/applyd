<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'company_name' => $this->faker->company(),
            'role_title' => $this->faker->jobTitle(),
            'job_url' => $this->faker->optional()->url(),
            'status' => $this->faker->randomElement(['applied', 'screening', 'interviewing', 'offer', 'rejected', 'withdrawn', 'ghosted']),
            'applied_at' => $this->faker->dateTimeBetween('-60 days', 'now'),
            'last_activity_at' => now(),
            'location' => $this->faker->city(),
            'employment_type' => $this->faker->randomElement(['full_time', 'part_time', 'contract']),
            'salary_range' => $this->faker->randomElement(['$60k-$80k', '$80k-$100k', '$100k-$120k', null]),
            'source' => $this->faker->randomElement(['linkedin', 'company_website', 'job_board', 'referral', 'other']),
        ];
    }
}
