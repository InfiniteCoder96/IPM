@extends('layouts.admin.app')


@section('page-header')
    <section class="content-header">
        <h1>
            Companies
            <small>new company</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Companies</li>
            <li class="active">Add New Company</li>
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
                    <h3 class="box-title">Add New Company</h3>
                    <div class="pull-right">
                        <a class="btn btn-flat btn-danger disabled" >Company ID: {{$id}}</a>
                    </div>
                </div>
                <form role="form" action="{{ route('companies.store') }}" method="POST" enctype="multipart/form-data" id="accident_create_form" autocomplete="off">
                    @csrf
                    <div class="box-body">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Company Name</label>
                                        <input type="text" name="comp_name" id="comp_name" class="form-control" placeholder="Company name" autocomplete="off">
                                        <span class="help-block hide">Help block with error</span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Company Policies</label>
                                        <select class="form-control select23"  multiple="multiple" data-placeholder="Select a State" id="policies" name="policies_id[]" style="width: 100%;" autocomplete="off">

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Company Address</label>


                                        <textarea name="comp_address" class="form-control" autocomplete=off></textarea>

                                        <span class="help-block hide">Help block with error</span>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-md-6">
                                    <div class="form-group">
                                        <label>Company Logo</label>


                                        <div class="dropzone dropzone-previews" id="my-awesome-dropzone"></div>

                                        <span class="help-block hide">Help block with error</span>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div class="box-footer">
                        <button type="reset" onclick="reset()" class="btn btn-default">Reset</button>
                        <button type="button" class="btn btn-info" id="accident_create_form_submit">Submit</button>
                    </div>
                </form>
                <!-- /.box-body -->
            </div>
        </div>
    </div>

@endsection

@section('scripts')


    <script>
        Dropzone.options.myAwesomeDropzone = {
            url:action="{{ route('companies.store') }}",
            autoProcessQueue: false,
            previewsContainer: ".dropzone-previews",
            uploadMultiple: true,
            maxFiles: 2,
            acceptedFiles: ".jpeg,.jpg,.png,.gif",
            addRemoveLinks: true,
            timeout: 5000,
            init: function () {

                var myDropzone = this;

                // Update selector to match your button
                $("#accident_create_form_submit").click(function (e) {
                    e.preventDefault();
                    myDropzone.processQueue();
                });

                this.on('sending', function(file, xhr, formData) {
                    // Append all form inputs to the formData Dropzone will POST
                    var data = $('#accident_create_form').serializeArray();
                    $.each(data, function(key, el) {
                        formData.append(el.name, el.value);
                    });
                });
            },
            success: function(file, response)
            {

                var myDropzone = this;

                $('#accident_create_form').trigger("reset");
                myDropzone.removeFile(file);

                $('#success-alert').removeClass('hide');
                $('#success-msg').html('Accident reported successfully');
            },
            error: function(file, response)
            {
                return false;
            }
        };

        $(function () {

            $('.select23').select2();

        });

        fetchPolicies();
        function fetchPolicies() {
            $.ajax({
                url: "{{route('policies.fetch_policies')}}",
                method:'GET',
                dataType: 'json',
                success: function (data) {

                    $('#policies').html(data.policies_data);

                }
            });
        }
    </script>
@endsection
