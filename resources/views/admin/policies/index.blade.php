@extends('layouts.admin.app')


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
                            <th>Topic</th>
                            <th>Price</th>
                            <th>Add-ons</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($policies as $policy)
                            <tr>
                                <td>{{$policy->id}}</td>
                                <td>{{$policy->topic}}</td>
                                <td>{{$policy->price}}</td>
                                <td>{{$policy->addons}}</td>
                                <td>
                                    <form action="{{ route('policies.destroy',$policy->id) }}" method="POST" id="formfields">

                                        <a class="btn btn-xs btn-info " href="{{ route('policies.show',$policy->id) }}">Show</a>

                                        <a class="btn btn-xs btn-primary" href="{{ route('policies.edit',$policy->id) }}">Edit</a>

                                        @csrf
                                        @method('DELETE')

                                        <button
                                                type="button"
                                                class="btn btn-xs btn-danger"
                                                data-toggle="modal"
                                                data-target="#vendorDeleteConfirmationModal"

                                                data-id="{{$policy['id']}}"


                                        >Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach

                        </tbody>
                        <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Topic</th>
                            <th>Price</th>
                            <th>Add-ons</th>
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
