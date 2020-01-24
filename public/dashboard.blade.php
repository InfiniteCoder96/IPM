<?php use Carbon\Carbon; ?>
@extends('layouts.admin.app')


@section('page-header')
    <section class="content-header">
        <h1>
            Dashboard
            <small>Version 1.0</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
        </ol>
    </section>
@endsection

@section('content')


<!-- Info boxes -->
<div class="row">
    <div class="col-lg-3 col-md-4 col-xs-12">
        <!-- small box -->
        <div class="small-box bg-teal">
            <div class="inner">
                <h3>Rs. {{number_format($tot_sale,2)}}</h3>

                <p>Total Sale ({{Carbon::now()->format('F')}})</p>

            </div>
            <div class="icon">
                <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer">
                More info <i class="fa fa-arrow-circle-right"></i>
            </a>

        </div>

    </div>
    <!-- /.col -->
    <div class="col-lg-3 col-md-4 col-xs-12">
        <!-- small box -->
        <div class="small-box bg-maroon-gradient">
            <div class="inner">
                <h3>Rs. {{number_format($tot_short,2)}}</h3>

                <p>Total Short ({{Carbon::now()->format('F')}})</p>
            </div>
            <div class="icon">
                <i class="ion ion-android-warning"></i>
            </div>
            <a href="#" class="small-box-footer">
                More info <i class="fa fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>
    <!-- /.col -->

    <!-- fix for small devices only -->
    <div class="clearfix visible-sm-block"></div>

    <div class="col-lg-3 col-md-4 col-xs-12">
        <!-- small box -->
        <div class="small-box bg-olive-active">
            <div class="inner">
                <h3>Rs. {{number_format($tot_excess,2)}}</h3>

                <p>Total Excess ({{Carbon::now()->format('F')}})</p>
            </div>
            <div class="icon">
                <i class="ion ion-android-arrow-up"></i>
            </div>
            <a href="#" class="small-box-footer">
                More info <i class="fa fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>
    <!-- /.col -->
    <div class="col-lg-3 col-md-4 col-xs-12">
        <!-- small box -->
        <div class="small-box bg-purple-gradient">
            <div class="inner">
                <h3>{{$tot_free_Cards ?? 0}}</h3>

                <p>Total Free Cards ({{Carbon::now()->format('F')}})</p>
            </div>
            <div class="icon">
                <i class="ion ion-android-bulb"></i>
            </div>
            <a href="#" class="small-box-footer">
                More info <i class="fa fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->

<div class="row">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Monthly Recap Report</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">

                    <div class="col-md-12">
                        <div>
                            <div id="cc"></div>
                            <!-- Sales Chart Canvas -->
                        </div>
                        <!-- /.chart-responsive -->
                    </div>
                    <!-- /.col -->

                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- ./box-body -->

            <!-- /.box-footer -->
        </div>
        <!-- /.box -->
    </div>
    <!-- /.col -->
</div>


<!-- /.row -->

@endsection

@section('scripts')

    <script>


        var users =  <?php echo json_encode($users) ?>;
        var sale_by_face_value =  <?php echo json_encode($free_cards) ?>;
        var sale_cards = <?php echo  json_encode($sales_cards)?>;

        Highcharts.chart('cc', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Sales Growth, ' + (new Date).getFullYear()
            },
            subtitle: {
                text: 'Source: RCSM Sales Data'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Sales'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    allowPointSelect: true
                }
            },
            series: [{
                name: 'Sales Rs.',
                data: users
            },{
                name: 'Free Cards',
                data: sale_by_face_value
            },{
                name:'Sales Cards',
                data: sale_cards
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });


    </script>



@endsection
