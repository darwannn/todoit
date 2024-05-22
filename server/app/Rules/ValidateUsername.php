<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateUsername implements ValidationRule
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
        if (!$this->user ||  $this->user->username == $value) {
            $fail('The username must be different from the current username');
        }
        return;
    }
}
