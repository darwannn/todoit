<?php

namespace App\Helpers;

use Carbon\Carbon;

use App\Models\User;
use App\Models\VerificationToken;
use App\Notifications\EmailVerification;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class Auth
{

    public static $custom_message = [
        'identifier.required' => 'Email or username field is required.',
        'password.regex' => 'The password must be between 8 and 16 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        'identifier.exists' => 'Account does not exist.',
        'avatar.image' => 'The avatar must be an image',
        'avatar.mimes' => 'The avatar must be a file of type: jpeg, jpg, png',
        'avatar.max' => 'The avatar may not be greater than 2kb',
    ];


    public static function send_email($user, $action, $request = null)
    {
        $token = Auth::generate_token();
        $expires_at = Carbon::now()->addMinutes(15);
        $id = $user->id;
        // $subject = '';
        // $body = '';
        $email = $user->email;

        $user->verificationToken()->updateOrCreate(['user_id' => $user->id], [
            'token' => $token,
            'expires_at' => $expires_at,
        ]);


        if ($user->save()) {
            if ($action == "activate") {
                $subject = 'Account Activation';
                $body = 'To be able to use your account, please activate it first by clicking the link below.';
                $link = "/activate/$token/$id";
            } else if ($action == "change-email") {
                $subject = 'Change Email';
                $body = 'To change your email address, please click the link below.';
                $link = "/change-email/$token/$request->email/$id";
                $email = $request->email;
            } else {
                $subject = 'Reset Password';
                $body = 'To reset your password, please click the link below.';
                $link = "/auth/new-password/$token/$id";
            }
            $notification = [
                'to' => $email,
                'name' => "{$user->first_name} {$user->last_name}",

                'subject' => $subject,
                'body' => $body,
                'link' => env("CLIENT_BASE_URL") . $link,
            ];

            $is_sent =   Notification::route('mail', $notification['to'])->notify(new EmailVerification($notification));
            if (!$is_sent) {
                return Response::error('Failed to send email', 500);
            }

            return true;
        }
    }

    public static function generate_token()
    {
        do {
            return $token = Str::random(40);
        } while (VerificationToken::where('token', $token)->exists());
    }

    public static function check_identifier($identifier)
    {
        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $identifierType = 'email';
        } else {
            $identifierType = 'username';
        }
        return $identifierType;
    }
}
