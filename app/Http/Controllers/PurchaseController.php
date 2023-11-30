<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Customer;
use App\Models\Item;
use App\Models\Order;
use App\Models\Purchase;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd(Order::paginate(500));
        $orders = Order::
            searchOrder($request->search)->
            groupBy('id')->
            orderBy('created_at' ,'desc')->
            selectRaw('id ,customer_name ,sum(subtotal) as total ,is_cancelled ,created_at')->
            paginate(50);

        return Inertia::render('Purchases/Index' ,[
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::select('id' ,'name' ,'kana')->get();
        $items = Item::select('id' ,'name' ,'price')->where('is_selling' ,'=' ,true)->get();

        return Inertia::render('Purchases/Create' ,[
            'customers' => $customers,
            'items' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePurchaseRequest $request)
    {
        DB::beginTransaction();
        try {
            $emptyFlg = true;
            $purchase = Purchase::create([
                'customer_id' => $request->customer_id ,
                'is_cancelled'=> false
            ]);

            foreach($request->items as $item) {
                if($item['value'] > 0) {
                    $purchase->items()->attach($purchase->id ,[
                        'item_id' => $item['id'],
                        'count' => $item['value']
                    ]);
                    $emptyFlg = false;
                }
            }

            if($emptyFlg) {
                DB::rollBack();
                return to_route('purchases.create')
                    ->with([
                        'message' => '購入個数は一つ以上必要です',
                        'status'  => 'error'
                    ]);
            }
            DB::commit();
            return to_route('purchases.index')
                ->with([
                    'message' => '登録が完了しました。',
                    'status'  => 'success'
                ]);
        } catch(Exception $e) {
            DB::rollBack();
            return to_route('purchases.create')
                ->with([
                    'message' => $e->getMessage(),
                    'status'  => 'error'
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Purchase $purchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Purchase $purchase)
    {
        $customer = Customer::select('id' ,'name' ,'kana')->where('id' ,'=' ,$purchase->customer_id)->get();
        $items = Item::select('id' ,'name' ,'price')->where('is_selling' ,'=' ,true)->get();

        return Inertia::render('Purchases/Edit' ,[
            'purchase' => $purchase,
            'items' => $items,
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        DB::beginTransaction();
        try {
            $emptyFlg = true;

            $purchase->items()->detach();
            foreach($request->items as $item) {
                if($item['value'] > 0) {
                    $purchase->items()->attach($purchase->id ,[
                        'item_id' => $item['id'],
                        'count' => $item['value']
                    ]);
                    $emptyFlg = false;
                }
            }

            if($emptyFlg) {
                DB::rollBack();
                return to_route('purchases.edit')
                    ->with([
                        'message' => '購入個数は一つ以上必要です',
                        'status'  => 'error'
                    ]);
            }
            DB::commit();
            return to_route('purchases.index')
                ->with([
                    'message' => '登録が完了しました。',
                    'status'  => 'success'
                ]);
        } catch(Exception $e) {
            DB::rollBack();
            return to_route('purchases.edit')
                ->with([
                    'message' => $e->getMessage(),
                    'status'  => 'error'
                ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->is_deleted = true;
        $purchase->deleted_at = Now();

        $purchase->save();

        return to_route('purchases.index')->with([
            'message' => '削除しました。' ,
            'status'  => 'success'
        ]);
    }
}
