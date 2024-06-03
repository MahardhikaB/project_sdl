<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SDLUser;

class SDLUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SDLUser::create(
        [
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'pin' => '4321',
        ]
        );
    }
}
