<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('user.welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/admin', 'HomeController@admin')->name('admin');

Route::get('policies/fetch_policies', 'PolicyController@fetch_policies')->name('policies.fetch_policies');

Route::resource('companies', 'CompanyController');
Route::resource('policies', 'PolicyController');
Route::resource('policy_addons', 'PolicyAddonController');

