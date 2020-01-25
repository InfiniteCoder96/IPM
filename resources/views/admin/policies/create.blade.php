@extends('layouts.admin.app')


@section('page-header')
    <section class="content-header">
        <h1>
            Policies
            <small>new policy</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Policies</li>
            <li class="active">Add New Policy</li>
        </ol>
    </section>
@endsection

@section('content')
    <div class="alert alert-success alert-dismissible hide" id="success-alert">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Alert!</h4>
        <p id="success-msg"></p>
    </div>
    @if ($errors->any())
        <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h4><i class="icon fa fa-ban"></i> Alert!</h4>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>

    @endif
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">Add New Policy</h3>
                    <div class="pull-right">
                        <a class="btn btn-flat btn-danger disabled" >Policy ID: {{$id}}</a>
                    </div>
                </div>
                <form role="form" action="{{ route('policies.store') }}" method="POST" enctype="multipart/form-data" id="accident_create_form">
                    @csrf
                    <div class="box-body">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Policy Name</label>
                                        <input type="text" name="topic" id="comp_name" class="form-control" placeholder="Company name">
                                        <span class="help-block hide">Help block with error</span>
                                    </div>
                                </div>

                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-12 col-md-12">

                                    <div class="form-group">
                                        <label>Policy Content</label>
                                        <textarea id="editor1" name="content" rows="10" cols="80">
                                                                        This is my textarea to be replaced with CKEditor.</textarea>

                                        <span class="help-block hide">Help block with error</span>
                                    </div>

                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Policy Price</label>
                                        <input type="text" name="price" id="comp_name" class="form-control" placeholder="Company name">
                                        <span class="help-block hide">Help block with error</span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Policy Add-Ons</label>
                                        <select class="form-control select23"  multiple="multiple" data-placeholder="Select a State" id="addons" name="addons_id[]" style="width: 100%;" autocomplete="off">

                                        </select>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="reset" onclick="reset()" class="btn btn-default">Reset</button>
                        <button type="submit" class="btn btn-info" id="accident_create_form_submit">Submit</button>
                    </div>
                </form>
                <!-- /.box-body -->
            </div>
        </div>
    </div>

@endsection

@section('scripts')


    <script>


        $(function () {

            $('.select23').select2();

            CKEDITOR.replace('editor1');

        });

        fetchAddons();
        function fetchAddons() {
            $.ajax({
                url: "{{route('policy_addons.fetch_addons')}}",
                method:'GET',
                dataType: 'json',
                success: function (data) {

                    $('#addons').html(data.addons_data);

                }
            });
        }
    </script>
@endsection
