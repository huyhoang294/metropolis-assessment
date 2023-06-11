<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVisitorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email',
            'phone_number' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:8',
            'has_vehicle' => 'required|boolean',
            'purpose_of_visiting' => 'required|string|max:250',
            'check_out' => 'nullable|date',
            'check_in' => 'nullable|date'
        ];
    }
}
