<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itemList = Item::select('id','name','price' ,'is_selling' ,'updated_at')
            ->where('is_deleted' ,'=','false')
            ->get();
        // dd($itemList);
        return Inertia::render('Items/Index' ,[
            'items' => $itemList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Items/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        Item::create([
            'name'  => $request->name,
            'price' => $request->price,
            'memo'  => $request->memo
        ]);

        return to_route('items.index')
            ->with([
                'message' => '商品の登録が完了しました。' ,
                'status'  => 'success'
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return Inertia::render('Items/Show' ,['item' => $item]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit' ,['item' => $item]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->name = $request->name;
        $item->price = $request->price;
        $item->memo = $request->memo;

        $item->save();

        return to_route('items.index' ,['item' => $item])
            ->with([
                'message' => '商品情報を更新しました。' ,
                'status'  => 'success'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->is_deleted = true;
        $item->deleted_at = Now();

        $item->save();

        return to_route('items.index')
            ->with([
                'message'   => '商品を削除しました',
                'status'    => 'success'
            ]);
    }
}
