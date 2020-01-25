<?php

namespace App\Http\Controllers;

use App\Policy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PolicyController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $policies = Policy::with('Addons')->get();

        return view('admin.policies.index',compact('policies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $id = DB::table('policies')->max('id');

        $id += 1;

        return view('admin.policies.create', compact('id'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'topic' => 'required|unique:policies',
            'content' => 'required|string',
            'price' => 'required',
        ]);

        $company = new Policy();

        $comp_name = $request->get('topic');
        $comp_address = $request->get('content');

        
        $company['comp_name'] = $comp_name;
        $company['comp_address'] = $comp_address;
        $company['comp_logo'] = $logoName;

        $company->save();

        Policy::create($request->all());

        return redirect()->route('policies.index')
            ->with('success','Policy added successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function show(Policy $policy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function edit(Policy $policy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Policy $policy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function destroy(Policy $policy)
    {
        //
    }

    public function fetch_policies(){

        $policies = Policy::with('Addons')->get();

        $output = '';

        if(sizeof($policies) > 0){
            foreach ($policies as $policy){
                $output .= '
                        <option value="'.$policy->id.'">'.$policy->topic.'</option>
                    ';
            }

        }
        else{
            $output = '';
        }

        $data = array(
            'policies_data' => $output,
        );

        return json_encode($data);
    }
}
