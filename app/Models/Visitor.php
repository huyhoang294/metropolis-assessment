<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visitor extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * @var string
     */
    protected $table = 'visitors';

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'has_vehicle',
        'purpose_of_visiting',
        'check_out',
        'check_in'
    ];

    protected $dates = ['check_out', 'check_in'];

    protected $casts = [
        'has_vehicle' => 'boolean',
    ];

}
