<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Helpers\Auth;
use App\Helpers\Response;
use App\Rules\ValidateEmail;
use Illuminate\Http\Request;
use App\Rules\ValidateAvatar;
use App\Rules\ValidatePassword;
use App\Rules\ValidateUsername;
use Illuminate\Validation\Rule;
use App\Models\VerificationToken;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function me()
    {
        return Response::success(['user' => auth()->user()], null);
    }


    public function update_avatar(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', $user);

        $inputs = $request->validate([
            'avatar' => ['required', new ValidateAvatar()]

        ]);

        $image = $inputs['avatar'];

        if (preg_match('/^data:image\/(\w+);base64,/', $image)) {
            $image = substr($image, strpos($image, ',') + 1);
            $image = str_replace(' ', '+', $image);
            $imageName = $user->username . '_' . time() . '.jpg';
            Storage::disk('public')->put('/media/img/avatar/' . $imageName, base64_decode($image));
            $user->avatar = $imageName;

            if ($user->save()) {
                return response()->json(['user' => auth()->user()], 200);
            }
        }

        return response()->json(['error' => 'Failed to update avatar'], 500);
    }


    public function update_profile(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', [$user]);
        $inputs = $request->validate([
            'first_name' => ['required'],
            'last_name' => ['required'],
            //'username' => ['required', new ValidateUsername($user), Rule::unique('users', 'username')],
        ], Auth::$custom_message);

        $user->update($inputs);
        return Response::success(['user' => $user], 'Updated successfully');
    }
    public function update_username(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', [$user]);
        $inputs = $request->validate([
            'username' => ['required', new ValidateUsername($user), Rule::unique('users', 'username')],
        ], Auth::$custom_message);

        $user->update($inputs);
        return Response::success(['user' => $user], 'Updated successfully');
    }

    public function update_email(Request $request)
    {
        $user = auth()->user();
        $this->authorize('update', [$user]);

        $inputs = $request->validate([
            'email' => ['required', 'email', new ValidateEmail($user), Rule::unique('users', 'email')],
        ], Auth::$custom_message);
        $is_sent = Auth::send_email($user, "change-email", $request);
        if ($is_sent) {
            return Response::success(null, "A link to change your email address has been sent to {$inputs['email']}");
        }

        return Response::success(['user' => $user], 'Updated successfully');
    }

    public function verify_email($token, $email, $id)
    {

        $account = VerificationToken::with("user")->where(['user_id' =>  $id, 'token' => $token])->where('expires_at', '>', Carbon::now())->first();

        if (!$account) {
            return Response::error('Unauthorized', 403);
        }
        $account->user->email = $email;
        $account->user->email_verified_at = Carbon::now();
        $account->user->save();
        $account->user->verificationToken()->delete();
        return Response::success(null, 'Email updated successfully');
    }

    public function update_password(Request $request)
    {
        $user = auth()->user();

        $this->authorize('update', [$user]);
        $inputs = $request->validate([
            'old_password' => ['required'], new ValidatePassword($user),
            'password' => ['required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&,*._])(?=.*\d).{8,16}$/'],
        ], Auth::$custom_message);

        $user->update(['']);
        return Response::success(['user' => $user], 'Updated successfully');
    }
}
