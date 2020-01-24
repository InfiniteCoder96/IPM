function rmRecord(id, tbl, factive) {
    alert('Rm record');
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

