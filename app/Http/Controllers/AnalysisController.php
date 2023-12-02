<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalysisController extends Controller
{
    function index() {
        return Inertia::render('Purchases/Analysis');
    }
}
