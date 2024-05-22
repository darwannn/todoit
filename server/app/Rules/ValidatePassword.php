<?php

namespace App\Rules;

use Closure;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidatePassword implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->user || !Hash::check($value, $this->user->password)) {
            $fail('Incorrect Password');
        }
        return;
    }
}
