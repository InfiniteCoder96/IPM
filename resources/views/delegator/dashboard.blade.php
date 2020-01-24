<?php use Carbon\Carbon; ?>
@extends('layouts.delegator.app')


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





<!-- /.row -->

@endsection

@section('scripts')

    <script>




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
