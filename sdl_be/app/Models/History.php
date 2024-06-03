<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $table = 'histories';
    protected $fillable = ['user_id', 'image'];
    protected $append = ['image'];

    public function getImageAttribute()
    {
        return asset('storage/' . $this->attributes['image']);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
