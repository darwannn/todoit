<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateAvatar implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!in_array(substr($value, 0, strpos($value, ";")), ['data:image/jpeg', 'data:image/jpg', 'data:image/png'])) {
            $fail("The $attribute must be a valid JPEG, JPG, or PNG image.");
        }
    }
}
