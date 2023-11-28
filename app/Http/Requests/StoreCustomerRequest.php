<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'  => ['required' ,'max:20'],
            'kana'  => ['required' ,'regex:/^[ァ-ヶー  ]+$/u'],
            'tel'   => ['required','regex:/^0\d{2,3}-\d{1,4}-\d{4}/'],
            'email' => ['required','email'],
            'postcode'  => ['required' ,'regex:/\d{3}-\d{4}/' ,'max:8'],
            'address'   => ['required','string'],
            'birthday'  => ['required','date'],
            'gender'    => ['required' ,'boolean'],
            'memo'  => ['max:2000']
        ];
    }
}
