var url_pricemulti = 'https://min-api.cryptocompare.com/data/pricemulti';
var url_histominute = 'https://min-api.cryptocompare.com/data/histominute';
var url_histoday = 'https://min-api.cryptocompare.com/data/histoday';
var url_currecy ='https://min-api.cryptocompare.com/data/price';
var api_key = 'api_key=2aaaeb8c2dc2317dabf8eda1b23019dbc24c6ac145ddaeeddf7c452557b4aef2';

var dt_range = null;
var dt_unix = null;
var curr = null;
var fsymMap = {};
var tsymMap = {};
var chart_data = null;
var IsFirstRun = true;

$(document).ready(function() {
    // setInterval(function(){ init(); }, 3000);
    init();
  
    getcurrrytable();
    
});



function init() {
    if (IsFirstRun) {
        setConstants();
        refreshHistories('6H');
        refreshCurrenctTypes();
        refreshHistoryTbl();
    } else {
     
        refreshCurrenctTypes();
        refreshHistoryTbl();
    }
    
    IsFirstRun = false;
}

function setConstants() {
    fsymMap = {
        'eth': 'ETH',
        'bch': 'BCH',
        'eos': 'EOS',
        'ltc': 'LTC',
        'btc': 'BTC',
        'dash': 'DASH'
    };
    tsymMap = {
        'btc': 'BTC',
        'usd': 'USD',
        'eur': 'EUR',
        'myr': 'MYR'
    }
    if (curr == null) {
        curr = 'ETH';
    }
}

function generateapiurl()
{
    
    if(dt_range=='6H')
    {
      //  alert("6h");
      
        urlpass=url_histominute+'?ts=' + moment.unix(dt_unix);
        return urlpass;
    }   
    else if(dt_range=='All')
    {
        urlpass=url_histoday+'?limit=2000&allData=true' ;
        return urlpass;
        
    }
    else 
    {
        var dt =moment.unix(dt_unix).utc();
  
        urlpass=url_histoday+'?limit=2000&toTs=' +dt;
    
        return urlpass;
     
    }  
}

function refreshCurrenctTypes() {
    $("#curr_btns_div").empty();
    $.each(fsymMap, function(key, value) {
        
        var url = url_histominute + '?fsym=' + value + '&tsym=' + tsymMap.usd + '&limit=1' + '&api_key=' + api_key;
//        console.log(url);
        $.getJSON(url, function(data) {
            var high = data.Data[0].high;
            var low = data.Data[0].low;
            
            var vopen = data.Data[0].open;
            var vclose = data.Data[0].close;
            
          
            if(vclose>vopen)
            {
                strvalcss = 'style="color: green;"';
            }   
            else
            {
                strvalcss = 'style="color: red;"';
            }    
            
            var per = ((1 - (low / high)) * 100).toFixed(2);
            if(high>low)
            {
                strarr ='<i class="fa fa-level-up"></i>';
            }
            else
            {
                strarr ='<i class="fa fa-level-down"></i> ';
            }  
            
            
            
            $('#curr_btns_div').append('<div class="col-lg-2 col-md-2"><div style="border-radius: 2px;-webkit-box-shadow: 0 1px 5px rgb(111, 108, 108);box-shadow: 0 1px 5px #e2b427; cursor:pointer;" onclick="refreshCurrency(\'' + value + '\');" ><center><b>' + value + '</b><br/><span id="btn_' + key + '_val" '+strvalcss+'>' + vclose + '</span><br/><span '+strvalcss+' id="btn_' + key + '_per" >' + per + '% '+strarr+'</span></center></div></div>');
        });
    });
}



function refreshHistoryTbl() {
    $("#curr_tbl").empty();
    
    var url = generateapiurl() + '&fsym=' + curr  + '&tsym=' + tsymMap.usd +  '&api_key=' + api_key;
    
//    var url = url_histominute + '?fsym=' + curr + '&tsym=' + tsymMap.usd + '&limit=30' + '&api_key=' + api_key;
    if (dt_range != null) {
       // url += '&ts=' + dt_unix;
    }
    
//    console.log(url);
    $.getJSON(url, function(data) {
         $('#data-table').DataTable().clear().destroy();
        chart_data = data;
        $.each(data.Data, function(key, value) {
            var high = value.high;
            var low = value.low;
            var vopen = value.open;
            var vclose = value.close;
            
            if(vclose>vopen)
            {
                strvalcss = 'style="color: green;"';
            }   
            else
            {
                strvalcss = 'style="color: red;"';
            } 
           
            if((value.time)>=dt_unix)
            {    
                var time1 = UnixToDateTime(value.time, 'dt');
                var time = moment(time1).format('DD-MM-YYYY HH:mm'); //moment(value.time,"YYYY-MM-DD HH:mm");
                
                var per = ((1 - (low / high)) * 100).toFixed(2);
                $('#curr_tbl').append('<tr><td>' + time + '</td><td>' + (high - low).toFixed(2) + '</td><td><span '+strvalcss+'>' + vclose + '</span></td></tr>');
            }
        });
       
       
        
        initDataTable('data-table');
//        $("#data-table").DataTable();
       
        generateChart();
    });
   
}

function generateChart() {
    var titlegp = $('#graphtitle').val();
    var gpvalue = $('#graphvalue').val();
    
    var arr_x = [];
    var arr_close = [];
    var arr_high = [];
    var arr_low = [];
    var arr_open = [];
    
    $.each(chart_data.Data, function(key, value) {
        if(value.time>=dt_unix)
        {  
           
        arr_x.push(UnixToDateTime(value.time, 'd'));
        
   //     arr_x.push(UnixToDateTime(value.time, 'd'));
        arr_close.push(value.close);
        arr_high.push(value.high);
        arr_low.push(value.low);
        arr_open.push(value.open);
            }
    });
    var trace = {
        x: arr_x,
        close: arr_close,
        decreasing: {
            line: {
                color: '#911f09'
            }
        },
        high: arr_high,
        increasing: {
            line: {
                color: '#148c34'
            }
        },
        line: {
            color: 'rgba(31,119,180,1)'
        },
        
        low: arr_low,
        open: arr_open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var TimeFrom = UnixToDateTime(chart_data.TimeFrom, 'd');
    var TimeTo = UnixToDateTime(chart_data.TimeTo, 'd');

    var data = [trace];
//console.log([trace]);
    var layout = {
        title:titlegp,
        paper_bgcolor:'rgb(0,0,0)',
        plot_bgcolor:'rgb(5,5,0)',
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 45,
            b: 40,
            l: 60
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            domain: [0, 1],
            range: [TimeFrom, TimeTo],
            rangeslider: {
                range: [TimeFrom, TimeTo]
            },
            title: gpvalue,
            type: 'date'
        },
        yaxis: {
            autorange: true,
            domain: [0, 1],
            range: [0, 50],
            type: 'linear'
        }
    };

    Plotly.plot('plotly-div', data, layout, {
        showSendToCloud: true
    });
}

function refreshHistories(dt) {
    var doRun = (dt_range != null && dt_range != undefined && dt_range != dt);
    dt_range = dt;
    var today = new Date();
    if (dt == '6H') {
        today.setDate(today.getDate() - 0.5);
    } else if (dt == '3D') {
        today.setDate(today.getDate() - 3);
    } else if (dt == '7D') {
        today.setDate(today.getDate() - 7);
    } else if (dt == '14D') {
        today.setDate(today.getDate() - 14);
    } else if (dt == '1M') {
        today.setDate(today.getDate() - 30);
    } else if (dt == 'All') {
        dt_range = null;
    } else {
        dt_range = '6H';
    }
    dt_unix = DateTimeToUnix(today);
    
  
    if (doRun) {
        init();
    }
}

function refreshCurrency(pcurr) {
    curr = pcurr;
    init();
}

function DateTimeToUnix(dt) {
    return new Date(dt).getTime() / 1000;
}

function UnixToDateTime(unixtimestamp, type) {
//    var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//    var date = new Date(unixtimestamp * 1000);
//    var year = date.getFullYear();
//    var month = months_arr[date.getMonth()];
//    var day = date.getDate();
//    var hours = date.getHours();
//    var minutes = "0" + date.getMinutes();
//    var seconds = "0" + date.getSeconds();
      var timestampInMilliSeconds = unixtimestamp*1000; //as JavaScript uses milliseconds; convert the UNIX timestamp(which is in seconds) to milliseconds.
        var todayTime = new Date(timestampInMilliSeconds); //create the date object

//    var todayTime = new Date();
//    var month = format(todayTime .getMonth() + 1);
//    var day = format(todayTime .getDate());
//    var year = format(todayTime .getFullYear());
//    return month + "/" + day + "/" + year;

        //var month = format(todayTime.getMonth() + 1);
        //var day = format(todayTime.getDate());
        //var year = format(todayTime.getFullYear());
        
        date_var = todayTime;// (month + '-' + day + '-' + year);
//    if (type == 'd') {
//        var timestampInMilliSeconds = unixtimestamp*1000; //as JavaScript uses milliseconds; convert the UNIX timestamp(which is in seconds) to milliseconds.
//        var todayTime = new Date(timestampInMilliSeconds); //create the date object
//
//        var month = (todayTime.getMonth() + 1);
//        var day = (todayTime.getDate());
//        var year = (todayTime.getFullYear());
//        
//        date_var =  (month + '-' + day + '-' + year);
//    } else if (type == 'dt') {
//        date_var =  (month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
//    } else if (type == 't'){
//        date_var =  (hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
//    }
    return date_var;
}


function getCurrenctvalue(pcurr,seccurr,fldid) 
{
    // currecy details    
    var url = url_currecy + '?fsym=' + pcurr + '&tsyms=' + seccurr +  '&api_key=' + api_key;

    $.getJSON(url, function(data) {
           
        exrate = data.USD;
        $('#'+fldid).html(exrate);

        //return exrate;
   });
    
}

function getcurrrytable()
{
    getCurrenctvalue('BTC','USD',"btcprice");
    getCurrenctvalue('ETH','USD',"ethprice");
    getCurrenctvalue('LTC','USD',"ltcprice");
    getCurrenctvalue('XRP','USD',"xrpprice");
    getCurrenctvalue('EOS','USD',"eosprice");

}