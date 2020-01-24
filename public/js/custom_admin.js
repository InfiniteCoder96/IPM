$(document).ready(function() {

  
    marketdatagrid();

});

function deactivateRecord(id, tbl, factive) {
     alert('deactivate');
    factive = (factive == undefined || factive == '' ? 0 : factive);
    if (id != '') {
        if (confirm("Are you sure you want to " + (factive == 0 ? "Deactivate" : "Activate") + "?")) {
            var dataString = 'id=' + id + '&tbl=' + tbl + '&factive=' + factive;
            $.ajax({
                type: "POST",
                url: "../admin/data/deleterecords.php",
                data: dataString,
                cache: false,
                success: function(result) {
                    if (result == '1') {
                        if (tbl == 'a') {
                            /* admin, reseller, master */
                            $("#tda" + id).text('Inactive');
                            document.getElementById("btna" + id).style.display = 'none';
                        } else if (tbl == 'm') {
                            /* member */
                            $("#tdm" + id).text('Inactive');
                            document.getElementById("btnm" + id).style.display = 'none';
                            document.getElementById("btnmlogin" + id).style.display = 'none';
                        } else if (tbl == 'mp') {
                            /* member package */
                            $("#tdmp" + id).text('Inactive');
                            document.getElementById("btnmp" + id).style.display = 'none';
                        } else if (tbl == 'cu') {
                            /* currency */
                            $("#tdcu" + id).text('Inactive');
                            document.getElementById("btncu" + id).style.display = 'none';
                        } else if (tbl == 'ts') {
                            /* topup setting */
                            $("#tdts" + id).text('Inactive');
                            document.getElementById("btnts" + id).style.display = 'none';
                        } else if (tbl == 'tr') {
                            /* trade setting */
                            $("#tdtr" + id).text('Inactive');
                            document.getElementById("btntr" + id).style.display = 'none';
                        } else if (tbl == 'ln') {
                            /* latest news */
                            $("#tdln" + id).text('Inactive');
                            document.getElementById("btnln" + id).style.display = 'none';
                        } else if (tbl == 'a1') {
                            /* announcement 1 */
                            $("#tda1" + id).text('Inactive');
                            document.getElementById("btna1" + id).style.display = 'none';
                        } else if (tbl == 'a2') {
                            /* announcement 2 */
                            $("#tda2" + id).text('Inactive');
                            document.getElementById("btna2" + id).style.display = 'none';
                        } else if (tbl == 'sl') {
                            /* announcement 2 */
                            $("#btnsl" + id).text('Inactive');
                            document.getElementById("btnsl" + id).style.display = 'none';
                        } else if (tbl == 'po') {
                            /* announcement 2 */
                            $("#btnpo" + id).text('Inactive');
                            document.getElementById("btnpo" + id).style.display = 'none';
                        } else if (tbl == 'lo') {
                            /* announcement 2 */
                            $("#btnlo" + id).text('Inactive');
                            document.getElementById("btnlo" + id).style.display = 'none';
                        }

                    }
                }
            })
        }
    }
}

function getAdmin(id, rid) {
    if (id != '') {
        var dataString = 'id=' + id + '&rid=' + rid + '&val=admin';
        $.ajax({
            type: "POST",
            url: "../admin/data/ajax.php",
            data: dataString,
            cache: false,
            success: function(result) {
                $("#admin_by").html(result);
                $("#reseller").html("<option value=''>Choose an Admin First</option>");
            }
        })
    } else {
        $("#admin_by").html("<option value=''>Choose an Reseller First</option>");
    }
}

function getReseller(id, rid) {
    if (id != '') {
        var dataString = 'id=' + id + '&rid=' + rid + '&val=reseller';
        $.ajax({
            type: "POST",
            url: "../admin/data/ajax.php",
            data: dataString,
            cache: false,
            success: function(result) {
                $("#reseller").html(result);
                $("#upline").html("<option value=''>Choose a Reseller First</option>");
            }
        })
    } else {
        $("#reseller").html("<option value=''>Choose an Admin First</option>");
    }
}

function getUpline(id, rid) {
    if (id != '') {
        var dataString = 'id=' + id + '&rid=' + rid + '&val=upline';
        $.ajax({
            type: "POST",
            url: "../admin/data/ajax.php",
            data: dataString,
            cache: false,
            success: function(result) {
                $("#upline").html(result);
            }
        })
    } else {
        $("#upline").html("<option value=''>Choose a Reseller First</option>");
    }
}

function viewImg(sr) {
    $('#mimg').attr('src', sr);
    $('#myModal').modal('show');
}

function changeStatus(id, status, ref, tbl) {
    var pstatus;
    if (status == '1') {
        pstatus = prompt("Are you sure you want to Approve Ref No: " + ref + "?\r\nType a message for the member", "");
    } else {
        pstatus = prompt("Are you sure you want to Reject Ref No: " + ref + "?\r\nType a message for the member", "");
    }

    if (pstatus !== null) {
        if (tbl == 'deposit') {
            var dataString = 'id=' + id + '&status=' + status + '&tbl=' + tbl + '&msg=' + pstatus;
            $.ajax({
                type: "POST",
                url: "../System/data/approve_reject.php",
                data: dataString,
                dataType: 'html',
                success: function(result) {
                console.log(result);
                    
                    if (result == '1') 
                    {
                        
                        document.getElementById("tr" + id).style.display = 'none';
                    }
                }
            });
        } else {

            var dataString = 'id=' + id + '&status=' + status + '&tbl=' + tbl + '&msg=' + pstatus;
            $.ajax({
                type: "POST",
                url: "../System/data/change_status.php",
                data: dataString,
                cache: false,
                success: function(result) {
                    if (result == '1') {
                        document.getElementById("tr" + id).style.display = 'none';
                    }
                }
            });

        }
    }
}

// redemption approval 
function changeRedeStatus(id, status, ref, tbl) {
    var pstatus;
    if (status == '1') {
        pstatus = prompt("Are you sure you want to Approve Ref No: " + ref + "?\r\nType a message for the member", "");
    } else {
        pstatus = prompt("Are you sure you want to Reject Ref No: " + ref + "?\r\nType a message for the member", "");
    }

    if (pstatus !== null) {
        

            var dataString = 'id=' + id + '&status=' + status + '&tbl=' + tbl + '&msg=' + pstatus;
            $.ajax({
                type: "POST",
                url: "../System/data/change_status.php",
                data: dataString,
                cache: false,
                success: function(result) {
                    if (result == '1') {
                        document.getElementById("tr" + id).style.display = 'none';
                    }
                }
            });

        
    }
}



function approveTrading(id, status, ref) {
    var dstatus;
    if (status == '1') {
        dstatus = confirm("Are you sure you want to Change to On-Running Ref No: " + ref + "?");
    }

    if (dstatus === true) {
        var dataString = 'id=' + id + '&status=' + status;
        //alert(dataString);
        $.ajax({
            type: "POST",
            url: "../admin/data/approve_trading.php",
            data: dataString,
            cache: false,
            success: function(result) {
                if (result == '1') {
                    document.getElementById("tr" + id).style.display = 'none';
                }
            }
        });
    }
}


function payTrading(id, status, ref, amt, mid) {
    var mit_type = $("#sel_mti_type").val();
    
    var pstatus;
    if (status == '1') {
        pstatus = prompt("Are you sure you want to pay Ref No: " + ref + "?\r\nType the Interest to be paid to the member (%)", "");
    } else if (status == '2') {
        pstatus = prompt("Are you sure you want to pay and return Ref No: " + ref + "?\r\nType the Interest to be paid to the member (%)", "");
    }


    if (pstatus !== null) {
        var dataString = 'sel_mti_type='+ mit_type +'&id=' + id + '&percent=' + pstatus + '&amt=' + amt + '&stat=' + status + '&m=' + mid;
        //alert(dataString);
        $.ajax({
            type: "POST",
            url: "../admin/data/pay_trading.php",
            data: dataString,
            cache: false,
            success: function(result) {
                if (result == '1') {
                    if (status == '2') {
                        document.getElementById("tr" + id).style.display = 'none';
                        alert('Interest paid successfully to member and Trading is Closed');
                    } else if (status == '1') {
                        alert('Interest paid successfully to member and Trading is still On-Running');
                    }
                }
            }
        });
    }

}

function payTradingSelected(st) {

    if ($('#pay_trading input[type=checkbox]:checked').length) {

        var pstatus;
        if (st == '1') {
            pstatus = prompt("Are you sure you want to pay?\r\nType the Interest to be paid to the member (%)", "");
        } else if (st == '2') {
            pstatus = prompt("Are you sure you want to pay and return?\r\nType the Interest to be paid to the member (%)", "");
        }

        if (pstatus !== null) {
            $("#tstatus").val(st);
            $("#tpercent").val(pstatus);
            $("#pay_trading").submit();
        }

    } else {

        alert("Select atleast one trading");
        return false;

    }

}

function searchTrading() {
    var smember = $("#search_member").val();
    var sreseller = $("#search_reseller").val();
    var sdate = $("#search_date").val();
    var samount = $("#search_amount").val();
    var stype = $("#trade_type").val();
    var strade = $("#market").val();
    

    if (smember != '') {
        $("#smember").val(smember);
    } else {
        $("#smember").val('');
    }

    if (sreseller != '') {
        $("#sreseller").val(sreseller);
    } else {
        $("#sreseller").val('');
    }

    if (sdate != '') {
        $("#sdate").val(sdate);
    } else {
        $("#sdate").val('');
    }

    if (samount != '') {
        $("#samount").val(samount);
    } else {
        $("#samount").val('');
    }

    if (stype != '') {
        $("#stype").val(stype);
    } else {
        $("#stype").val('');
    }
    
    if (strade != '') {
        $("#strade").val(strade);
    } else {
        $("#strade").val('');
    }

    $("#trading_list").submit();

}

function toggle(source) {
    checkboxes = document.getElementsByName('trade[]');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

function confirmpostingsharepayoutfund() {
    if ($('#txtperdivided').val() == '') {
        alert("Percentage cannot be blank");
        return false;
    }
    if ($('#txtperdivided').val() == 0) {
        alert("Percentage cannot be blank");
        return false;
    }

    if (confirm('Do you want to Share divided  ?')) {
        var url1 = "data/pay_out_eshare.php";
        url = "pmode=paygfund";
        url = url + "&tpercent=" + $('#txtperdivided').val();

        $.ajax({
            dataType: 'HTML',
            data: url,
            url: url1,
            type: 'POST',
            async: false,
            success: function(data) {
                //  alert(data);
                alert('Recorded Successfully Posted');
            }
        });
    } else {

    }
}


function confirmpostinggpayoutfund() {
    if (confirm('Do you want to G-Pay Fund ?')) {
        var url1 = "data/pay_out_gfund.php";
        var url = "pmode=paygfund";

        $.ajax({
            dataType: 'HTML',
            data: url,
            url: url1,
            type: 'POST',
            async: false,
            success: function(data) {
                alert('Recorded Successfully Posted');
            }
        });
    } else {

    }
}

function approvePost(id, status, ref) {
    var dstatus = confirm("Are you sure you want to Change Status of POST: '" + ref + "'?");;
    if (dstatus === true) {
        var dataString = 'id=' + id + '&status=' + status;
        //alert(dataString);
        $.ajax({
            type: "POST",
            url: "../admin/data/approve_posts.php",
            data: dataString,
            cache: false,
            success: function(result) {
                document.getElementById("btnpoapp" + id).style.display = 'none';
            }
        });
    }
}

function reloadPostType(type) {
    window.location.href = window.location.href.split('?')[0] + '?type=' + type;
}

//save the admin trading
$("form#fromtradvalue").submit(function(){
   // alert("sas");
   var formData = $(this).serialize();
   //console.log(formData);
   
   $.ajax({
        url: 'data/market_update_trade_data.php?pmode=save',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
//            alert('Recorded Successfully Posted');
            marketdatagrid();
   //         loadcategory1grid();
        }
    });
    return false;
});

//update grid
function marketdatagrid()
{
        var url1 = "data/market_grid_data.php";
        var url = "pmode=save";

        $.ajax({
            dataType: 'HTML',
            data: url,
            url: url1,
            type: 'POST',
            async: false,
            success: function(data) {
//                alert('Recorded Successfully Posted');
                $("#tbltradegrid").html(data);
            }
        });
    
}

