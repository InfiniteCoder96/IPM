function changeCurrency(val, amt) {
    if (val) {
        var cur_name = $('#currency').find('option:selected').text();
        var dataString = 'cur=' + val;
        $.ajax({
            type: "POST",
            url: "../member/data/getcurrencyrate.php",
            data: dataString,
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);
                var cu_rate = data.deposit_rate;
                var cu_details = data.type_details;
                var deposit_amount = cu_rate * amt;
                $("#deposit_amount").val(deposit_amount);
                $("#upload_label").html('Upload Slip for ' + cur_name + ' ' + deposit_amount + ' :');
                $("#deposit_details").html(cu_details);
            }
        });
    } else {
        $("#deposit_amount").val('');
        $("#upload_label").html('Upload Slip :');
        $("#deposit_details").html('');
    }
}

function changeTopupCurrency() {

    var cur_name = $('#currency').find('option:selected').text();
    var amt = $('#actual_amount').val();
    var val = $('#currency').val();
    if (val != '' && amt != '') {
        var dataString = 'cur=' + val;
        $.ajax({
            type: "POST",
            url: "../member/data/getcurrencyrate.php",
            data: dataString,
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);
                var cu_rate = data.deposit_rate;
                var cu_details = data.type_details;
                var deposit_amount = amt * cu_rate;
                $("#deposit_amount").val(deposit_amount);
                $("#upload_label").html('Upload Slip for ' + cur_name + ' ' + deposit_amount + ' :');
                $("#deposit_details").html(cu_details);
            }
        });
    } else {
        $("#deposit_amount").val('');
        $("#upload_label").html('Upload Slip :');
        $("#deposit_details").html('');
    }
}

function getWithdrawFund(v) {
    var thawed_acoount_dc = $('#thawed_account_dc').val();
    var thawed_acoount_rc = $('#thawed_account_rc').val();
    var bonus_account = $('#bonus_account').val();
    var gpay_account = $('#gpay_account').val();
    var rc_account = $('#rc_account').val();
    var cap_account = $('#captial_account').val();
    


    if (v == '2') {
        $('#available_fund').val(thawed_acoount_dc);
    } else if (v == '4') {
        $('#available_fund').val(bonus_account);
    } else if (v == '1') {
        $('#available_fund').val(gpay_account);
    }else if (v == '3') {
        $('#available_fund').val(thawed_acoount_rc);
    }else if (v == '5') {
        $('#available_fund').val(rc_account);
    }else if (v == '6') {
        $('#available_fund').val(cap_account);
    }

}

function getWithdrawMethodDetails(v) {
    var mid = $('#member').val();
    if (v != '' && mid != '') {
        var dataString = 'wm=' + v + '&m=' + mid;
        $.ajax({
            type: "POST",
            url: "../member/data/getmemberinfo.php",
            data: dataString,
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);
                var wm_label = data.label;
                var wm_value = data.value;
                if (wm_value == '' || wm_value == null) {
                    alert('Details not available. Please set in Member Profile');
                    $("#method_details").val('');
                    $("#withdraw_method_label").html('');
                } else {
                    $("#method_details").val(wm_value);
                    $("#withdraw_method_label").html(wm_label + ' :');
                }
            }
        });
    } else {
        $("#method_details").val('');
        $("#withdraw_method_label").html('');
    }
}


function changeActualamount() {
    var amt = $('#amount').val();
    var val = $('#withdraw_method').val();
    if (val != '' && amt != '') {
        var dataString = 'cur=' + val;
        $.ajax({
            type: "POST",
            url: "../member/data/getcurrencyrate.php",
            data: dataString,
            cache: false,
            success: function(data) {
                data = $.parseJSON(data);
                var cu_rate = data.withdraw_rate;
                if (cu_rate > 0) {
                    var actual_amount = Math.round((amt * cu_rate) * 100) / 100;
                    $("#actual_amount").val(actual_amount);
                    $("#withdraw_rate").html(cu_rate);
                } else {
                    $("#actual_amount").val('');
                    $("#withdraw_rate").html('');
                }
            }
        });
    } else {
        $("#actual_amount").val('');
        $("#withdraw_rate").html('');
    }
}




function viewRejected(msg, type) {
    if (msg != '') {
        $('#rejected_message').text(msg);
    }

    if (type == 'deposit') {
        $("#myModalWithdrawLabel").css("display", "none");
        $("#myModalWithdrawText").css("display", "none");
        $("#myModalDepositLabel").css("display", "block");

        $("#myModalDepositLabel1").css("display", "none");
        $("#myModalDepositText1").css("display", "none");

        $("#myModalDepositText").css("display", "block");
    } else if (type == 'withdraw') {
        $("#myModalDepositLabel").css("display", "none");
        $("#myModalDepositText").css("display", "none");

        $("#myModalDepositText1").css("display", "none");
        $("#myModalDepositLabel1").css("display", "none");

        $("#myModalWithdrawLabel").css("display", "block");
        $("#myModalWithdrawText").css("display", "block");
    } else if (type == 'G-Pay Rewards') {
        $("#myModalDepositLabel").css("display", "none");
        $("#myModalDepositText").css("display", "none");
        $("#myModalDepositLabel1").css("display", "block");
        $("#myModalDepositText11").css("display", "block");
        $("#myModalWithdrawLabel").css("display", "none");
        $("#myModalWithdrawText").css("display", "none");
    } else if (type == 'E-Share') {
        $("#myModalDepositLabel").css("display", "none");
        $("#myModalDepositText").css("display", "none");
        $("#myModalDepositLabel1").css("display", "none");
        $("#myModalDepositText11").css("display", "none");
        $("#myModalWithdrawLabel").css("display", "none");
        $("#myModalWithdrawText").css("display", "none");
        $("#myModalDepositLabel2").css("display", "block");
        $("#myModalDepositText12").css("display", "block");

    }



    $('#myModal').modal('show');
}


function assignexpiredate(id, refno) {
    $('#md_id_exp').val(id);
    $('#myModalExpire').modal('show');
}

function return_reward(id) {
    var url1 = "data/member_reward_expdt.php";
    // Set URL Paramaeters 
    url = "pmode=returnrewardamt";
    url = url + "&md_id=" + id;

    //Randon Parameter Value to Avoid Server Chash
    url = url + "&sid=" + Math.random();
    //Set Callback Function When Responce is Ready
    //alert(url);
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: url,
        url: url1,
        success: function(data) {
            console.log(data);
        }
    });
}

function updateexpdate() {
    var md_id = $('#md_id_exp').val();
    var md_expdt = $('#rewards_end').val();

    var url1 = "data/member_reward_expdt.php";
    // Set URL Paramaeters 
    url = "pmode=updateexpire";
    url = url + "&md_id=" + md_id;
    url = url + "&md_expdt=" + md_expdt;
    //Randon Parameter Value to Avoid Server Chash
    url = url + "&sid=" + Math.random();
    //Set Callback Function When Responce is Ready
    //alert(url);
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: url,
        url: url1,
        success: function(data) {
            console.log(data);
        }
    });

}


function deleteTrading(id) {
    $("#tradingid").val(id);
    $('#myModal').modal('show');
}

function confirmDeleteTrading() {
    $("#trading_delete").submit();
}

$("form#frmgfundpayout").submit(function() {
    var formData = $(this).serialize();
    alert("sadfasdf");
    return false;


    $.ajax({
        url: 'data/pay_out_gfund.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function(data) {
            // console.log(data);
            alert('Recorded Successfully Posted');
            //       loaddebtorsfollowupdetails();
            $('#restsms').click();
        }
    });
    return false;
});


function doLike(po_id, flike) {
    var url = "data/like_post.php";
    var params = "po_id=" + po_id + "&flike=" + flike;
    $.ajax({
        type: 'POST',
        dataType: 'html',
        data: params,
        url: url,
        success: function(data) {
            var upVal = parseInt($('.thumbs-up' + po_id).html());
            var downVal = parseInt($('.thumbs-down' + po_id).html());
            if (data == '1') {
                if (flike == 1) {
                    $('.thumbs-up' + po_id).html(++upVal);
                } else {
                    $('.thumbs-down' + po_id).html(++downVal);
                }
            } else if (data == '2_1_1') {
                $('.thumbs-up' + po_id).html(--upVal);
            } else if (data == '2_1_2') {
                $('.thumbs-up' + po_id).html(++upVal);
            } else if (data == '2_2_1') {
                $('.thumbs-down' + po_id).html(--downVal);
            } else if (data == '2_2_2') {
                $('.thumbs-down' + po_id).html(++downVal);
            }
        }
    });
}

function doRefreshLotto(lott_val) {
    window.location.href = window.location.href.split('?')[0] + '?lott_id=' + lott_val;
}

function getTradingData() {
    $.ajax({
        type: "GET",
        url: "./data/member_markettrade_data.php?mode=refreshdata",
        data: null,
        cache: false,
        success: function(data) {
            console.log(data);
            $('#trading_bet_div').html(data);
        }
    });
}

function doTradingBET(mkttype, tr_id) {
    var trading_amt = $('#trading_bet_subdiv' + tr_id + ' #actual_amount').val();
    
    if (trading_amt == undefined || trading_amt == '' || trading_amt == 0) {
        alert('Entered amount is not valid. Please a new value.')
        return;
    }
    var otp = 111111;// $('#otp').val();
    var params = "market=" + tr_id;
    params += '&trade_amount=' + trading_amt + '&otp=' + otp + '&mt_type=1';
    params += '&mkttype=' + mkttype;
    
   
    
    $.ajax({
        type: "POST",
        url: "./data/member_trading.php",
        data: params,
        cache: false,
        success: function(data) {
            
            switch (data) {
                case '0':
                    getTradingData();
                    break;
                case '1':
                    alert($('#error_display1').val());
                    break;
                case '2':
                    alert($('#error_display2').val());
                    break;
                case '3':
                    alert($('#error_display3').val());
                    break;
                case '4':
                    alert($('#error_display4').val());
                    break;
                case '5':
                    alert($('#error_display5').val());
                    break;
            }
        }
    });
};

var clipboard = new Clipboard('.copybtn');
clipboard.on('success', function(e) {
    //console.log(e);
});

clipboard.on('error', function(e) {
    //console.log(e);
});

