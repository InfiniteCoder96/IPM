<?php

namespace App\Http\Controllers;

use App\Policy_Addon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PolicyAddonController extends Controller
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
        $addons = Policy_Addon::with('Policies')->get();

        return view('admin.addons.index',compact('addons'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $id = DB::table('policy_addons')->max('id');

        $id += 1;

        return view('admin.addons.create', compact('id'));
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
            'name' => 'required|unique:policy_addons',
            'description' => 'required|string',
            'price' => 'required',
        ]);

        Policy_Addon::create($request->all());

        return redirect()->route('policy_addons.index')
            ->with('success','Addon added successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Policy_Addon  $policy_Addon
     * @return \Illuminate\Http\Response
     */
    public function show(Policy_Addon $policy_Addon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Policy_Addon  $policy_Addon
     * @return \Illuminate\Http\Response
     */
    public function edit(Policy_Addon $policy_Addon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Policy_Addon  $policy_Addon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Policy_Addon $policy_Addon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Policy_Addon  $policy_Addon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Policy_Addon $policy_Addon)
    {
        //
    }

    public function fetch_addons(){

        $addons = Policy_Addon::with('Policies')->get();

        $output = '';

        if(sizeof($addons) > 0){
            foreach ($addons as $addon){
                $output .= '
                        <option value="'.$addon->id.'">'.$addon->name.'</option>
                    ';
            }

        }
        else{
            $output = '';
        }

        $data = array(
            'addons_data' => $output,
        );

        return json_encode($data);

    }
}
