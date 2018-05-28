// ==UserScript==
// @name         AvtoHacker Fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://www.copart.com/lot/*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    Number.prototype.formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    setTimeout(function(){
        var cfw_vin = jQuery('#cfw-vin');
        if (cfw_vin.length) {
            var vin = cfw_vin.text();
            var html = '';
            html += '<div style="padding: 5px 10px; text-align:right;">';
            html += '&#x1F5D7; <a href="https://www.copart.com/g2mext/autocheck/'+vin+'" target="_blank">AutoCheck</a>';
            html += ' &nbsp; | &nbsp; ';
            html += '&#x1F5D7; <a href="https://www.google.com/search?q=copart+'+vin+'" target="_blank">Google</a>';
            html += ' &nbsp; | &nbsp; ';
            html += '&#x1F5D7; <a href="https://www.google.com/search?newwindow=1&hl=en&biw=1920&bih=1080&tbm=isch&sa=1&ei=xEIMW62BLoSosgHVwo7YBQ&q=copart+%20+'+vin+'" target="_blank">Google Images</a>';
            html += '</div>';
            cfw_vin.parent().append(html);
        }



        var ervEl = jQuery('#cfw-retail-price');
        if (ervEl.length) {
            var erv = +ervEl.text().replace(/[^0-9]+/g,'');

            if (erv>0) {
                var erv_25 = Math.round(erv*25/100);
                var erv_30 = Math.round(erv*30/100);
                var erv_35 = Math.round(erv*35/100);
                var erv_40 = Math.round(erv*40/100);
                var html = '';
                html += '<div style="text-align:right; padding:3px 10px;">';

                html += '<span style="display:inline-block; width: 125px; font-weight:normal; margin:0px;">35% = '+erv_35.formatMoney(0, '.', ',')+' $</span>';
                html += '<span style="display:inline-block; width: 125px; font-weight:normal; margin:0px;">25% = '+erv_25.formatMoney(0, '.', ',')+' $</span>';
                html += '<br>';
                html += '<span style="display:inline-block; width: 125px; font-weight:normal; margin:0px;">40% = '+erv_40.formatMoney(0, '.', ',')+' $</span>';
                html += '<span style="display:inline-block; width: 125px; font-weight:normal; margin:0px;">30% = '+erv_30.formatMoney(0, '.', ',')+' $</span>';

                html += '</div>';
                ervEl.parent().append(html);
            }
        }


        var grandTotal2El = jQuery('<div id="cfw-grand-total-2" style="font-weight:normal"></div>');
        jQuery('#cfw-grand-total').parent().append(grandTotal2El)

        jQuery('#cfw-current-bid').on('keyup keypress blur change', function(){

            setTimeout(function(){
            var grandTotal = +jQuery('#cfw-grand-total').text().replace( /[^0-9]+/g, '');
            var brokerFee = 500;
            var invoiceTotal = grandTotal + brokerFee;
            var invoiceTotal2 = Math.round((grandTotal + brokerFee) / 2);
            var portFee = 400;
            var customsClearingFee = Math.round(invoiceTotal*30/100); // 30% from invoice
            var customsClearingFee2 = Math.round(invoiceTotal2*30/100); // 30% from invoice
            var customsClearingFee2Extra = 150;
            var certFee = 300;
            var pensFundFee = Math.round(invoiceTotal*4/100); // 4%
            var pensFundFee2 = Math.round(invoiceTotal2*4/100); // 4%
            var extraExpenses = 1000;
            var superTotal = Math.round(invoiceTotal + portFee + customsClearingFee + certFee + pensFundFee);
            var superTotal2 = Math.round(invoiceTotal + portFee + customsClearingFee2 + customsClearingFee2Extra + certFee + pensFundFee2);

            var html = '';
            html +='<hr>';
            html +='<ul>';
            html +='<li>+ '+brokerFee.formatMoney(0, '.', ',')+' $ = Broker Fee</li>';

            html +='<li style="margin-top:15px;">INVOICE SUM = '+invoiceTotal.formatMoney(0, '.', ',')+' $</li>';
            html +='<li>+ '+portFee.formatMoney(0, '.', ',')+' $ = Port Fee</li>';
            html +='<li>+ '+customsClearingFee.formatMoney(0, '.', ',')+' $ = Customs Clearing (30%)</li>';
            html +='<li>+ '+certFee.formatMoney(0, '.', ',')+' $ = Certification</li>';
            html +='<li>+ '+pensFundFee.formatMoney(0, '.', ',')+' $ = Pension Fund (4%)</li>';
            html +='<li style="background-color:#E0E0E0; font-weight:bold; padding:3px 5px;">SUPER TOTAL: '+superTotal.formatMoney(0, '.', ',')+' $</li>';
            html +='<li style="color:gray; font-size:0.9em;">With Extra Reserve: '+superTotal.formatMoney(0, '.', ',')+' $ + '+extraExpenses.formatMoney(0, '.', ',')+'$';
            html +=' = '+((superTotal + extraExpenses).formatMoney(0, '.', ','))+'$';
            html +='</li>';


            html +='<li style="margin-top:15px;">INVOICE SUM/2 = '+invoiceTotal2.formatMoney(0, '.', ',')+' $</li>';
            html +='<li>+ '+portFee.formatMoney(0, '.', ',')+' $ = Port Fee</li>';
            html +='<li>+ '+customsClearingFee2.formatMoney(0, '.', ',')+' $ = Customs Clearing (30%)</li>';
            html +='<li>+ '+customsClearingFee2Extra.formatMoney(0, '.', ',')+' $ = Customs Clearing Extra</li>';
            html +='<li>+ '+certFee.formatMoney(0, '.', ',')+' $ = Certification</li>';
            html +='<li>+ '+pensFundFee2.formatMoney(0, '.', ',')+' $ = Pension Fund (4%)</li>';
            html +='<li style="background-color:#E0E0E0; font-weight:bold; padding:3px 5px;">SUPER TOTAL: '+superTotal2.formatMoney(0, '.', ',')+' $</li>';
            html +='<li style="color:gray; font-size:0.9em;">With Extra Reserve: '+superTotal2.formatMoney(0, '.', ',')+' $ + '+extraExpenses.formatMoney(0, '.', ',')+'$';
            html +=' = '+((superTotal2 + extraExpenses).formatMoney(0, '.', ','))+'$';
            html +='</li>';

            html +='</ul>'
            grandTotal2El.html(html);
            }, 1000);
        });

        jQuery('#cfw-current-bid').trigger("change");

        var descrItem = null;

        descrItem = $(".lot-details-inner").find("span[data-uname='DriverValue']").first();
        if (descrItem.length) {
          descrItem.css('color', 'white').css('padding', '3px 5px');
          if (descrItem.text() == 'All wheel drive') {
              descrItem.css('background-color', 'green');
          } else {
              descrItem.css('background-color', 'red');
          }
        }

        descrItem = $(".lot-details-inner").find("span[data-uname='lotdetailFuelvalue']").first();
        if (descrItem.length) {
          descrItem.css('color', 'white').css('padding', '3px 5px');
          if (descrItem.text() == 'GAS') {
              descrItem.css('background-color', 'green');
          } else {
              descrItem.css('background-color', 'red');
          }
        }

        descrItem = $(".lot-details-inner").find("span[data-uname='lotdetailKeyvalue']").first();
        if (descrItem.length) {
          descrItem.css('color', 'white').css('padding', '3px 5px');
          if (descrItem.text() == 'YES') {
              descrItem.css('background-color', 'green');
          } else {
              descrItem.css('background-color', 'red');
          }
        }

        descrItem = $(".lot-details-inner").find("span[data-uname='lotdetailOdometervalue']").first();
        if (descrItem.length) {
          var odoValue = descrItem.text().replace(/[^0-9]+/g,'');
          var odoKm = odoValue;
          descrItem.css('color', 'white').css('padding', '3px 5px');
          descrItem.find('p').css('color', 'white');
          if (descrItem.text().indexOf('mi')>0) {
              odoKm = Math.round(odoValue*1.6);
              descrItem.append('<div style="padding-right:15px; font-weight:normal;">'+odoKm.toLocaleString('en')+' km</div>')
          }
          if (odoKm > 1 && odoKm<150000) {
              descrItem.css('background-color', 'green');
          } else {
              descrItem.css('background-color', 'red');
          }
        }



        var descrItems = $(".lot-details-inner > div.details");
        if (descrItems.length) {
            for (var i=0; i<descrItems.length; i++) {
                var descrItemLabel = jQuery(descrItems[i]).find('label').first();
                if (descrItemLabel.length) {
                   // console.log(descrItemLabel.text().trim());

                    if (descrItemLabel.text().trim() == 'Transmission:') {
                        var descrItemValue = jQuery(descrItems[i]).find('span.lot-details-desc').first();
                        if (descrItemValue.length) {
                            descrItemValue.css('color', 'white').css('padding', '3px 5px');
                            if (descrItemValue.text() == 'AUTOMATIC') {
                                descrItemValue.css('background-color', 'green');
                            } else {
                                descrItemValue.css('background-color', 'red');
                            }
                        }
                    }

                    if (descrItemLabel.text().trim()  == 'Engine Type:') {
                        var descrItemValue = jQuery(descrItems[i]).find('span').first();
                        if (descrItemValue.length) {
                            descrItemValue.css('color', 'white').css('padding', '3px 5px');
                            var engineVol = parseFloat(descrItemValue.text().trim().replace(/\s.+$/g,'').replace(/[^0-9.,]+/g,'').replace(',','.'))*1000;
                            if ( engineVol > 1800 && engineVol <= 3000) {
                                descrItemValue.css('background-color', 'green');
                            } else {
                                descrItemValue.css('background-color', 'red');
                            }
                        }
                    }

                    if (descrItemLabel.text().trim()  == 'Sale Date:') {
                        var descrItemValue = jQuery(descrItems[i]).find('span').first();
                        if (descrItemValue.length) {
                            descrItemValue.css('color', 'white').css('padding', '3px 5px');
                            if (descrItemValue.text().trim() == 'Future') {
                                descrItemValue.css('background-color', 'red');
                                jQuery('div.bid-info-header').append('<div style="background-color:red; padding:5px; color:white; text-align: center; font-weight:bold;"> !!! = FUTURE AUCTION = !!! </div>');
                            }
                        }
                    }
                }
            }
        }


    }, 5000);
})();
