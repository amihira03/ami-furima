<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'score' => ['required', 'integer', 'between:1,5'],
        ];
    }

    public function messages(): array
    {
        return [
            'score.required' => '評価を選択してください',
            'score.integer' => '評価を正しく選択してください',
            'score.between' => '評価を正しく選択してください',
        ];
    }
}
