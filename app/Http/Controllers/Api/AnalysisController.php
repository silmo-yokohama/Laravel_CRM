<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AnalysisController extends Controller
{
    //
    function index(Request $request) {
        $data =[];

        if($request->type === 'perDay') {
            $subQuery = Order::betweenDate($request->startDate ,$request->endDate)
                ->groupBy('id')
                ->selectRaw('id ,sum(subtotal) as total ,DATE_FORMAT(created_at ,"%Y/%m/%d") as date');

            $data = DB::table($subQuery)
                ->groupBy('date')
                ->selectRaw('date ,sum(total) as total')
                ->orderBy('date')
                ->get();

        }

        if($request->type === 'perMonth') {
            $subQuery = Order::betweenDate($request->startDate ,$request->endDate)
                ->groupBy('id')
                ->selectRaw('id ,sum(subtotal) as total ,DATE_FORMAT(created_at ,"%Y/%m") as date');

            $data = DB::table($subQuery)
                ->groupBy('date')
                ->selectRaw('date ,sum(total) as total')
                ->orderBy('date')
                ->get();

        }

        return response()->json([
            'data' => $data ,
            'type' => $request->type ,
            'startDate' => $request->startDate ,
            'endDate' => $request->endDate,
        ] ,Response::HTTP_OK);
    }
}
