<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class ResetPasswordController extends Controller
{
    public function showLinkRequestForm()
    {
        return view('auth.passwords.email'); // or just return a dummy view for now
    }
}
