<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use App\Models\User;
use App\Helpers\Auth;

use App\Helpers\Response;
use App\Models\VerificationToken;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Rules\ValidatePassword;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        $identifierType = Auth::check_identifier($request->identifier);
        $user = User::with("verificationToken")->where($identifierType, $request->identifier)->first();
        $inputs =  $request->validate([
            'identifier' => ['required', Rule::exists('users',  $identifierType)],
            'password' => ['required', new ValidatePassword($user)],
        ], Auth::$custom_message);


        if ($user->email_verified_at == null) {


            $is_sent = Auth::send_email($user, "activate");
            if ($is_sent) {
                return Response::error('Account not activated. To be able to use your account, please activate it first by clicking the link  sent to your email.');
            }
        }

        $token = $user->createToken(env('SANCTUM_SECRET'))->plainTextToken;
        return Response::success(['user' => $user, 'token' => $token], 'Login successfully');
    }

    public function register(Request $request)
    {

        $inputs = $request->validate([
            'first_name' => ['required'],
            'last_name' => ['required'],
            'username' => ['required', Rule::unique('users', 'username')],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required',  'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&,*._])(?=.*\d).{8,16}$/'],
            //'password_confirmation' => ['required'],
        ], Auth::$custom_message);


        $inputs['password'] = bcrypt($inputs['password']);


        $user = User::create([
            'first_name' => $inputs['first_name'],
            'last_name' => $inputs['last_name'],
            'username' => $inputs['username'],
            'email' => $inputs['email'],
            'password' => $inputs['password'],

        ]);


        $is_sent = Auth::send_email($user, "activate");
        if ($is_sent) {
            return Response::success(null, 'To be able to use your account, please activate it first by clicking the link sent to your email.');
        }
    }



    public function logout()
    {

        auth()->user()->tokens()->delete();
        return Response::success(null, 'Logged out');
    }

    public function forgot_password(Request $request)
    {

        $identifierType = Auth::check_identifier($request->identifier);
        $inputs =  $request->validate([
            'identifier' => ['required', Rule::exists('users',  $identifierType)],
        ], Auth::$custom_message);


        $user = User::where($identifierType, $inputs['identifier'])->first();

        if ($user) {
            $is_sent = Auth::send_email($user, "new-password");
            if ($is_sent) {
                return Response::success(null, 'To be able to change your password, please click the link sent to your email.');
            }
        }
    }


    public function activate($token, $id)
    {

        $user = User::where("id", $id)->first();
        $verification = $user->verificationToken()->where(['user_id' => $id, 'token' => $token])->first();

        if (!$verification) {
            return Response::error('Unauthorized', 403);
        } else 
        if ($verification->expires_at < Carbon::now()) {
            $is_sent = Auth::send_email($user, "activate");
            if ($is_sent) {
                return Response::success(null, 'Activation link expired. A new verification link has been sent to your email.');
            }
        }
        $user->email_verified_at = Carbon::now();

        $user->save();
        $verification->delete();

        return Response::success(null, 'Account activated. You can now login to your account.');
    }

    public function new_password(Request $request, $token, $id)
    {
        $user = User::where("id", $id)->first();
        $verification = $user->verificationToken()->where(['user_id' => $id, 'token' => $token])->first();

        $inputs = $request->validate([

            'password' => ['required',  'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&,*._])(?=.*\d).{8,16}$/']
            // 'password_confirmation' => ['required'],
        ], Auth::$custom_message);

        $user->password = bcrypt($inputs['password']);
        $user->save();
        $verification->delete();

        return Response::success(null, 'Password changed successfully. You can now login with your new password.');
    }

    public function verify($token, $id)
    {

        $account = VerificationToken::with("user")->where('user_id', $id)->where('token', $token)->where('expires_at', '>', Carbon::now())->first();
        if ($account) {
            return Response::success(null, 'Authorized');
        }
        return Response::error('Unauthorized', 403);
    }
}
