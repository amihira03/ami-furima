<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(ProfileRequest $request)
    {
        $user = Auth::user();

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profiles', 'public');

            if (!empty($user->profile_image_path)) {
                Storage::disk('public')->delete($user->profile_image_path);
            }

            $user->profile_image_path = $path;
        }

        $user->name = $request->input('name');
        $user->postal_code = $request->input('postal_code');
        $user->address = $request->input('address');
        $user->building = $request->input('building');

        $user->save();

        return response()->json($user);
    }
}
