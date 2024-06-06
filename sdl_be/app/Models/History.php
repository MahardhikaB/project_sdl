<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class History extends Model
{
    use HasFactory;

    protected $table = 'histories';
    protected $fillable = ['user_id', 'image'];
    protected $append = ['image', 'created_at'];

    public function getImageAttribute()
    {
        return asset('storage/' . $this->attributes['image']);
    }

    public function getCreatedAtAttribute()
    {
        $createdAt = Carbon::parse($this->attributes['created_at']);
        return $createdAt->format('d-m-Y H:i:s'); // dd-mm-yyyy hh:mm:ss format
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
