@extends('layouts.delegator.app')


@section('page-header')
    <section class="content-header">
        <h1>
            Companies
            <small>company datatable</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Companies</li>
            <li class="active">Company List</li>
        </ol>
    </section>
@endsection

@section('content')

    <div class="row">
        <div class="col-xs-12">
            @if ($message = Session::get('success'))
                <div class="alert alert-success alert-dismissible" id="success-alert">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <h4><i class="icon fa fa-check"></i> Alert!</h4>
                    {{ $message }}
                </div>

            @endif
            @if ($message = Session::get('failed'))
                <div class="alert alert-warning alert-dismissible" id="success-alert">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <h4><i class="icon fa fa-warning"></i> Alert!</h4>
                    {{ $message }}
                </div>

            @endif
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Comapny List</h3>
                    <div class="pull-right">
                        <div class="btn-group">
                            <button type="button" class="btn  btn-success"><i class="fa fa-print"></i>&nbsp;&nbsp;&nbsp;Export as</button>
                            <button type="button" class="btn  btn-primary dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a id="pdf" href="" >PDF</a></li>
                                <li class="divider"></li>
                                <li><a id="excel" href="" >XLSX</a></li>
                                <li class="divider"></li>
                                <li><a id="excel" href="" >CSV</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($companies as $company)
                            <tr>
                                <td>{{$company->id}}</td>
                                <td>
                                    <img src="{{asset('comp_logos/'.$company->comp_logo)}}" style="height: 100px;width: 100px">
                                </td>
                                <td>{{$company->comp_name}}</td>
                                <td>{{$company->comp_address}}</td>

                                <td>
                                    <form action="{{ route('companies.destroy',$company->id) }}" method="POST" id="formfields">

                                        <a class="btn btn-xs btn-info " href="{{ route('companies.show',$company->id) }}">Show</a>

                                        <a class="btn btn-xs btn-primary" href="{{ route('companies.edit',$company->id) }}">Edit</a>

                                        @csrf
                                        @method('DELETE')

                                        <button
                                                type="button"
                                                class="btn btn-xs btn-danger"
                                                data-toggle="modal"
                                                data-target="#vendorDeleteConfirmationModal"

                                                data-id="{{$company['id']}}"


                                        >Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach

                        </tbody>
                        <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Address</th>
                            <th>Action</th>

                        </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        </div>
    </div>


@endsection
@section('scripts')
    <script>

        $(function () {



            $('.select2').select2()
            $('#example1').DataTable({
                "order": [[ 0, "desc" ]]
            });
            $('#example2').DataTable({
                'paging'      : true,
                'lengthChange': false,
                'searching'   : false,
                'ordering'    : true,
                'info'        : true,
                'autoWidth'   : false
            })
        })

        $('#vendorDeleteConfirmationModal').on('show.bs.modal', function(event){

            var button = $(event.relatedTarget);

            var id = button.data('id');

            var modal = $(this);

            modal.find('.modal-footer #vendor_id').val(id);

        });
    </script>

@endsection
