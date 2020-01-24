$(document).ready(function() {
    displayChart();
    displaynetsplit();
       getmarketvalue();
    setInterval(function() { displayChart() }, 1000 * 60 * 1);
    setInterval(function() { displaynetsplit() }, 1000 * 60 * 1);
    setInterval(function() { getmarketvalue() }, 1000 * 60 * 1);
 
});


function displaynetsplit()
{
   
    
    url="../admin/data/chart_data_net.php";
     
    $.ajax({
        type: 'GET',
        url: url,
        data: null,
        dataType: 'JSON',
        success: function (data) {
            //alert(data.ch_valc);
            //alert(data.ch_valp);
            
            $("#idnsper").html(data.ch_perc);
            $("#idnsval").html(data.ch_valc);
            if(data.ch_valc>data.ch_valp)
            {
                document.getElementById("idnetsplit").setAttribute("class", "description-percentage text-green");
                document.getElementById("idnparrow").setAttribute("class", "fa fa-caret-up");
            }
            else
            {
                document.getElementById("idnetsplit").setAttribute("class", "description-percentage text-red");
                document.getElementById("idnparrow").setAttribute("class", "fa fa-caret-down");
            }    
 
        },
        error: function(data, error) {
            // console.log(error);
        }
    });
    
}	

function displayChart() {
    $.ajax({

        url: "../admin/data/chart_data.php",
        method: "GET",
        success: function(data) {
            // console.log(data);
            var ch_dt = [];
            var ch_val = [];

            for (var i in data) {
                ch_dt.push(data[i].ch_time);
                ch_val.push(data[i].ch_val);
            }

            var speedCanvas = document.getElementById("salesChart");

            var dataFirst = {
                label: "RC Growth Rate",
                data: ch_val,
                lineTension: 0.3,
                fill: false,
                borderColor: '#E77512',
                backgroundColor: 'transparent',
                pointBorderColor: '#949BA2',
                pointBackgroundColor: '#E77512',
                pointRadius: 3,
                pointHoverRadius: 5,
                pointHitRadius: 20,
                pointBorderWidth: 2,
                pointStyle: 'rect'
            };

            var speedData = {
                labels: ch_dt,
                datasets: [dataFirst]
            };

            var chartOptions = {
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'white'
                    }
                }
            };

            var lineChart = new Chart(speedCanvas, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });


        },
        error: function(data, error) {
            // console.log(error);
        }
    });
}

//trade values
function getmarketvalue()
{
        var id = $('#txtmrkid').val();
        var url_a = "../member/data/market_data_net.php";
        var url = "pid="+id;
        
        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            data: url,
            url: url_a,
            success: function(data) {
               
                $("#trper").html(parseFloat((100*data.dv_trdval/data.dv_trval)).toFixed(2));
                $("#blper").html(parseFloat((100*data.dv_bnkval/data.dv_trval)).toFixed(2));
                $("#plper").html(parseFloat((100*data.dv_plval/data.dv_trval)).toFixed(2));
                
                $("#idwlper").html(parseFloat(((100*data.dv_winloss)/data.dv_tr_win_max)).toFixed(2));
                $("#idrlper").html(parseFloat(((100*data.dv_roll)/data.dv_tr_rollcom_max)).toFixed(2));
                
                $("#idtrval").html(data.dv_trdval);
                $("#idbkval").html(data.dv_bnkval);
                $("#idpvval").html(data.dv_plval);
                $("#idwlval").html(data.dv_winloss);
                $("#idcomval").html(data.dv_roll);
            }
        });
    
}