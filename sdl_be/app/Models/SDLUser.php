<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SDLUser extends Model
{
    use HasFactory;

    protected $table = 'sdl_users';
    protected $fillable = ['name', 'email', 'pin'];

    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
