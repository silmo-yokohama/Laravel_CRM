<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        DB::enableQueryLog();
        $customers = Customer::searchCustomer($request->search)->select('*')->where('is_deleted','=' ,false)->paginate(20);

        // dd($customers->toSql() ,$customers->getBindings());
        // dd($customers ,DB::getQueryLog());

        return Inertia::render('Customers/Index' ,[
            'customers' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        Customer::create([
            'name'  => $request->name,
            'kana'  => $request->kana,
            'tel'  => $request->tel,
            'email'  => $request->email,
            'postcode'  => $request->postcode,
            'address'  => $request->address,
            'birthday'  => $request->birthday,
            'gender'  => $request->gender,
            'memo'  => $request->memo,
        ]);

        return to_route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit' ,[
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->name = $request->name;
        $customer->kana = $request->kana;
        $customer->tel = $request->tel;
        $customer->email = $request->email;
        $customer->postcode = $request->postcode;
        $customer->address = $request->address;
        $customer->birthday = $request->birthday;
        $customer->gender = $request->gender;
        $customer->memo = $request->memo;

        $customer->save();

        return to_route('customers.edit' ,[
            'customer' => $customer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->is_deleted = 1;
        $customer->deleted_at = Now();

        $customer->save();

        return to_route('customers.index');
    }
}
