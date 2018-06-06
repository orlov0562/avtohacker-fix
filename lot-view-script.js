// ==UserScript==
// @name         AvtoHacker Fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  https://github.com/orlov0562/avtohacker-fix
// @author       Vitaliy Orlov
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

    var additionalCss = '';
    additionalCss += '<style type="text/css">';

    additionalCss += ' .ahf_redbox {background-color:red; color:white;}';
    additionalCss += ' .ahf_orangebox {background-color:#ff8400; color:black;}';
    additionalCss += ' .ahf_greenbox {background-color:green; color:white;}';
    additionalCss += ' .ahf_bluebox {background-color:#00ceff; color:white;}';
    additionalCss += ' .ahf_redbox a, .ahf_greenbox a, .ahf_bluebox a {color:white; opacity:0.5;}';
    additionalCss += ' .ahf_redbox a:hover, .ahf_greenbox a:hover, .ahf_bluebox a:hover {color:yellow; opacity:1;}';

    additionalCss += ' .ahf_redbox_p35 {display:inline-block; background-color:red; color:white; padding: 3px 5px !important;}';
    additionalCss += ' .ahf_orangebox_p35 {display:inline-block; background-color:#ff8400; color:black; padding: 3px 5px !important;}';
    additionalCss += ' .ahf_greenbox_p35 {display:inline-block; background-color:green; color:white; padding: 3px 5px !important;}';
    additionalCss += ' .ahf_bluebox_p35 {display:inline-block; background-color:#00ceff; color:white; padding: 3px 5px !important;}';
    additionalCss += ' .ahf_redbox_p35 a, .ahf_greenbox_p35 a, .ahf_bluebox_p35 a {color:white; opacity:0.5;}';
    additionalCss += ' .ahf_redbox_p35 a:hover, .ahf_greenbox_p35 a:hover, .ahf_bluebox_p35 a:hover {color:yellow; opacity:1;}';

    additionalCss += ' .ahf_redbox_p03 {display:inline-block; background-color:red; color:white; padding: 0px 3px !important;}';
    additionalCss += ' .ahf_orangebox_p03 {display:inline-block; background-color:#ff8400; color:black; padding: 0px 3px !important;}';
    additionalCss += ' .ahf_greenbox_p03 {display:inline-block; background-color:green; color:white; padding: 0px 3px !important;}';
    additionalCss += ' .ahf_bluebox_p03 {display:inline-block; background-color:#00ceff; color:white; padding: 0px 3px !important;}';
    additionalCss += ' .ahf_redbox_p03 a, .ahf_greenbox_p03 a, .ahf_bluebox_p03 a {color:white; opacity:0.5;}';
    additionalCss += ' .ahf_redbox_p03 a:hover, .ahf_greenbox_p03 a:hover, .ahf_bluebox_p03 a:hover {color:yellow; opacity:1;}';

    additionalCss += ' .ahf_erv_perc_item {display:inline-block; width: 125px; font-weight:normal; margin:0px;}';

    additionalCss += ' @keyframes ahf_blink { from { opacity: 1.0; } 50% { opacity: 0.5; } to { opacity: 1; }}';
    additionalCss += ' @-webkit-keyframes ahf_blink { from { opacity: 1.0; } 50% { opacity: 0.5; } to { opacity: 1; }}';
    additionalCss += ' .ahf_blink {animation:ahf_blink 1000ms infinite; -webkit-animation:ahf_blink 1000ms infinite;}';

    additionalCss += '</style>';
    jQuery(additionalCss).appendTo("head");

    setTimeout(function(){
        var cfw_vin = jQuery('#cfw-vin');
        if (cfw_vin.length) {
            var vin = cfw_vin.text().trim();
            var html = '';
            html += '<div style="padding: 5px 10px; text-align:right;">';
            if (vin!='') {
                html += '&#x1F5D7; <a href="https://www.copart.com/g2mext/autocheck/'+vin+'" target="_blank">AutoCheck</a>';
                html += ' | ';
                html += '&#x1F5D7; <a href="https://trackmyvin.com/en/vin-check?vin='+vin+'" target="_blank">TrackMyVin</a>';
                html += ' | ';
                html += '&#x1F5D7; <a href="https://www.vehiclehistory.com/paging-vin-report-data/new-report-wva.php?vin='+vin+'" target="_blank">Vehicle History</a>';
                html += '<br>';
                html += '<strong>Google:</strong> &nbsp;';
                html += '&#x1F5D7; <a href="https://www.google.com/search?q=copart+'+vin+'" target="_blank">All</a>';
                html += ' | ';
                html += '&#x1F5D7; <a href="https://www.google.com/search?q=inurl%3A'+vin+'" target="_blank">In url</a>';
                html += ' | ';
                html += '&#x1F5D7; <a href="https://www.google.com/search?newwindow=1&hl=en&biw=1920&bih=1080&tbm=isch&sa=1&ei=xEIMW62BLoSosgHVwo7YBQ&q=copart+'+vin+'" target="_blank">Images</a>';
            } else {
                html += '<small>Please <a href="#" onclick="location.reload(); return false;">update the page</a> to reparse VIN info<small>';
            }
            html += '</div>';
            cfw_vin.parent().append(html);
        }

        var titleEl = jQuery('h1.lot-vehicle-info > span.title');
        if (titleEl.length) {
            var title = titleEl.text().trim().replace(/^[0-9]{4}/g,'');
            var year = +titleEl.text().trim().replace(/^([0-9]{4}).+$/g,"$1");
            if (year>=2011 && year<=2018) {
                titleEl.html('<span class="ahf_greenbox_p35">'+year+'</span> '+title);
            } else {
                titleEl.html('<span class="ahf_redbox_p35">'+year+'</span> '+title);
            }
        }

        var erv = 0;
        var ervEl = jQuery('#cfw-retail-price');
        if (ervEl.length) {
            erv = +ervEl.text().replace(/[^0-9]+/g,'');

            if (erv>0) {
                var erv_15 = Math.round(erv*15/100);
                var erv_20 = Math.round(erv*20/100);
                var erv_25 = Math.round(erv*25/100);
                var erv_30 = Math.round(erv*30/100);
                var erv_35 = Math.round(erv*35/100);
                var erv_40 = Math.round(erv*40/100);
                var html = '';
                html += '<div style="text-align:right; padding:3px 10px;">';
                html += '<span class="ahf_erv_perc_item">35% = '+erv_35.formatMoney(0, '.', ',')+' $</span>';
                html += '<span class="ahf_erv_perc_item">25% = '+erv_25.formatMoney(0, '.', ',')+' $</span>';
                html += '<span class="ahf_erv_perc_item">15% = '+erv_15.formatMoney(0, '.', ',')+' $</span>';
                html += '<br>';
                html += '<span class="ahf_erv_perc_item">40% = '+erv_40.formatMoney(0, '.', ',')+' $</span>';
                html += '<span class="ahf_erv_perc_item">30% = '+erv_30.formatMoney(0, '.', ',')+' $</span>';
                html += '<span class="ahf_erv_perc_item">20% = '+erv_20.formatMoney(0, '.', ',')+' $</span>';
                html += '</div>';
                ervEl.parent().append(html);
            }
        }

        var goodDocTypes = [ // Possible values: titles
            'CERTIFICATE OF TITLE',
            'CLEAN TITLE',
            'SALVAGE TITLE',
            'MV-907A SALVAGE CERTIFICATE',
            'CERT OF TITLE-SALVAGE TITLE',
            'DEALER ONLY CLEAN TITLE'
        ];
        var docTypeState = 'N/A';

        var goodTransmissions = ['AUTOMATIC']; // Possible values: AUTOMATIC; MANUAL;
        var goodWheelDrives = ['All wheel drive']; // Possible values: All wheel drive; Front-wheel Drive;
        var goodFuels = ['GAS', 'DIESEL']; // Possible values: GAS; DIESEL

        const BROKER_FEE_CALC_TYPE_DEFAULT = 'default';
        const BROKER_FEE_CALC_TYPE_PARTNER = 'partner';
        const BROKER_FEE_CALC_TYPE_EXTERNAL = 'external';

        var brokerFeeCalcType = BROKER_FEE_CALC_TYPE_DEFAULT; // Possible values: BROKER_FEE_CALC_TYPE_DEFAULT; BROKER_FEE_CALC_TYPE_PARTNER; BROKER_FEE_CALC_TYPE_EXTERNAL
        var partnerBrokerFixedFee = 200;
        var partnerBrokerStates = ['AL','WI','MI']; // Possible values: <States Abbreviation>
        var externalBrokerFixedFee = 500;

        var brokerFeeCorrection = 0;
        var transactionFee = 0;

        var portFee = 400;
        var customsClearingFee2Extra = 150;
        var certFee = 300;
        var extraExpenses = 1000;

        var odometrHLLimit_1 = 100000;
        var odometrHLLimit_2 = 150000;



        var descrItems = $(".lot-details-inner div.details");
        if (descrItems.length) {
            for (var i=0; i<descrItems.length; i++) {
                var descrItemLabel = jQuery(descrItems[i]).find('label').first();
                if (descrItemLabel.length) {

                    console.log(descrItemLabel.text().trim());

                    var descrItemLabelText = descrItemLabel.text().trim();
                    var descrItemValue = '';

                    switch(descrItemLabelText) {
                        case 'Doc Type:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first().find('p').first();
                            if (descrItemValue.length) {
                                docTypeState = descrItemValue.text().replace("\n",' ').trim().replace(/^([^-]+)-.+$/g,'$1').trim();
                                var docType = descrItemValue.text().replace("\n",' ').trim().replace(/^[^-]+-(.+)$/g,'$1').trim();

                                var html = '';

                                if (jQuery.inArray(docType, goodDocTypes) > -1) {
                                    html += '<span style="margin:0px;" class="ahf_greenbox_p03">'+docType+'</span>';
                                } else {
                                    html += '<span style="margin:0px;" class="ahf_redbox_p03">'+docType+'</span>';
                                }

                                if (brokerFeeCalcType == BROKER_FEE_CALC_TYPE_EXTERNAL) {
                                    html += '<span style="margin:0px;  border-right:1px solid white;" class="ahf_greenbox_p03" id="ahf_doctype_state">'+docTypeState+'</span>';
                                } else {
                                    if (jQuery.inArray(docTypeState, partnerBrokerStates) > -1) {
                                        html += '<span style="margin:0px;  border-right:1px solid white;" class="ahf_orangebox_p03" id="ahf_doctype_state">'+docTypeState+'</span>';
                                        brokerFeeCalcType = BROKER_FEE_CALC_TYPE_PARTNER;
                                    } else {
                                        html += '<span style="margin:0px;  border-right:1px solid white;" class="ahf_greenbox_p03" id="ahf_doctype_state">'+docTypeState+'</span>';
                                    }
                                }

                                descrItemValue.html(html);
                            }
                        break;
                        case 'Highlights:':
                            descrItemValue = jQuery(descrItems[i]).find('span');
                            if (descrItemValue.length) {
                                for (var j=0; j<descrItemValue.length; j++) {
                                    var hl = jQuery(descrItemValue[j]).text().trim();
                                    switch(hl) {
                                        default:
                                            jQuery(descrItemValue[j]).addClass('ahf_redbox_p35');
                                        break;
                                        case 'Run and Drive':
                                            jQuery(descrItemValue[j]).addClass('ahf_greenbox_p35');
                                        break;
                                        case 'Donated Vehicle':
                                            jQuery(descrItemValue[j]).addClass('ahf_bluebox_p35');
                                        break;
                                    }
                                }
                            }
                        break;
                        case 'Sale Status:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first();
                            if (descrItemValue.length) {
                                if (descrItemValue.text().trim() == 'Pure Sale') {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else if (descrItemValue.text().trim() == 'Minimum Bid') {
                                    descrItemValue.addClass('ahf_orangebox_p35');
                                } else {
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;

                        case 'Transaction Fee:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first();
                            if (descrItemValue.length) {
                                transactionFee = +descrItemValue.text().replace(/[^0-9]+/g,'');
                                switch (brokerFeeCalcType) {
                                    case BROKER_FEE_CALC_TYPE_PARTNER:
                                        brokerFeeCorrection = partnerBrokerFixedFee;
                                    break;
                                    case BROKER_FEE_CALC_TYPE_EXTERNAL:
                                        brokerFeeCorrection = externalBrokerFixedFee - transactionFee;
                                    break;
                                }
                            }
                        break;
                        case 'Current Bid:':
                            if (erv > 0)  {
                                descrItemValue = jQuery(descrItems[i]).find('span').first();
                                if (descrItemValue.length) {
                                    var currentBid = +descrItemValue.text().replace(/[^0-9]+/g,'');
                                    if (currentBid > 0) {
                                        var erv_cb = Math.round(currentBid*100/erv);
                                        if (erv_cb<=30) {
                                           descrItemValue.append(' &nbsp; <span class="ahf_greenbox_p03">'+erv_cb+'%</span>');
                                        } else if (erv_cb<=40) {
                                           descrItemValue.append(' &nbsp; <span class="ahf_orangebox_p03">'+erv_cb+'%</span>');
                                        } else {
                                            descrItemValue.append(' &nbsp; <span class="ahf_redbox_p03">'+erv_cb+'%</span>');
                                        }
                                    }
                                }
                            }
                        break;
                        case 'Sale Price:':
                            if (erv > 0)  {
                                descrItemValue = jQuery(descrItems[i]).find('span').first();
                                if (descrItemValue.length) {
                                    var currentBid = +descrItemValue.text().replace(/[^0-9]+/g,'');
                                    if (currentBid > 0) {
                                        var erv_cb = Math.round(currentBid*100/erv);
                                        if (erv_cb<=30) {
                                           descrItemValue.append(' &nbsp; <span style="margin:0px;" class="ahf_greenbox_p03">'+erv_cb+'%</span>');
                                        } else if (erv_cb<=40) {
                                           descrItemValue.append(' &nbsp; <span style="margin:0px;" class="ahf_orangebox_p03">'+erv_cb+'%</span>');
                                        }else {
                                           descrItemValue.append(' &nbsp; <span style="margin:0px;" class="ahf_redbox_p03">'+erv_cb+'%</span>');
                                        }

                                        var soldEl = jQuery('div.sold-bid div.sold').first();
                                        if (soldEl.length) {
                                            soldEl.html(soldEl.text() + ' &rarr; ' + currentBid + '$ = ' + erv_cb + '%');
                                        }
                                    }
                                }
                            }
                        break;
                        case 'Transmission:':
                            descrItemValue = jQuery(descrItems[i]).find('span.lot-details-desc').first();
                            if (descrItemValue.length) {
                                if (jQuery.inArray(descrItemValue.text().trim(), goodTransmissions) > -1) {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else {
                                    if (descrItemValue.text().trim() == '') descrItemValue.html('N/A');
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;
                        case 'Drive:':
                            descrItemValue = jQuery(descrItems[i]).find('span.lot-details-desc').first();
                            if (descrItemValue.length) {
                                if (jQuery.inArray(descrItemValue.text().trim(), goodWheelDrives) > -1) {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else {
                                    if (descrItemValue.text().trim() == '') descrItemValue.html('N/A');
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;
                        case 'Fuel:':
                            descrItemValue = jQuery(descrItems[i]).find('span.lot-details-desc').first();
                            if (descrItemValue.length) {
                                if (jQuery.inArray(descrItemValue.text().trim(), goodFuels) > -1) {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else {
                                    if (descrItemValue.text().trim() == '') descrItemValue.html('N/A');
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;
                        case 'Keys:':
                            descrItemValue = jQuery(descrItems[i]).find('span.lot-details-desc').first();
                            if (descrItemValue.length) {
                                if (descrItemValue.text().trim() == 'YES') {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else {
                                    if (descrItemValue.text().trim() == '') descrItemValue.html('N/A');
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;
                        case 'Engine Type:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first();
                            if (descrItemValue.length) {
                                var engineVol = parseFloat(descrItemValue.text().trim().replace(/\s.+$/g,'').replace(/[^0-9.,]+/g,'').replace(',','.'))*1000;
                                if ( engineVol > 1800 && engineVol <= 3000) {
                                    descrItemValue.addClass('ahf_greenbox_p35');
                                } else {
                                    descrItemValue.addClass('ahf_redbox_p35');
                                }
                            }
                        break;
                        case 'Sale Date:':
                            var soldEl = jQuery('div.sold-bid div.sold').first();
                            if (!soldEl.length) {
                                descrItemValue = jQuery(descrItems[i]).find('span').first();
                                if (descrItemValue.length) {
                                    if (descrItemValue.text().trim() == 'Future') {
                                        descrItemValuecss('padding', '3px 5px').addClass('ahf_redbox');
                                        jQuery('div.bid-info-header').append('<div style="padding:5px; text-align: center; font-weight:bold;" class="ahf_redbox"> !!! = FUTURE AUCTION = !!! </div>');
                                    }
                                    var auctionDateTime = descrItemValue.text().trim().replace("\n",' - ').replace(', 2018','').replace(' EEST','');
                                    jQuery('.bid-info-content .lot-details-inner').prepend('<div style="padding:5px 10px; border-bottom:1px solid #E0E0E0;">'+auctionDateTime+' <span id="ahf_time_left" style="display:inline-block; float:right; margin:0;"></span></div>');
                                }
                            }
                        break;
                        case 'Time Left:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first();
                            if (descrItemValue.length) {
                                var timeLeft = descrItemValue.text().replace('min','M').trim();
                                if (timeLeft.indexOf('0D')>-1) {
                                    jQuery('#ahf_time_left').html('<span style="color:red; margin:0;">'+timeLeft+'</span>');
                                } else {
                                    jQuery('#ahf_time_left').html(timeLeft);
                                }
                            }
                        break;
                        case 'Location:':
                            descrItemValue = jQuery(descrItems[i]).find('span').first();
                            if (descrItemValue.length) {
                                var aucLocation = descrItemValue.text().trim();
                                var aucLocationState = aucLocation.replace("\n",' ').trim().replace(/^([^-]+)-.+$/g,'$1').trim();
                                if (docTypeState != aucLocationState) {
                                    descrItemValue.addClass('ahf_redbox_p35');
                                    var html = '';
                                    html += '<div class="ahf_redbox ahf_blink" style="display:block; margin:5px 10px; padding:3px 5px; text-align:right;">';
                                    html += 'Docs State differs from auction State: '+docTypeState+' <> '+aucLocationState;
                                    html += '</div>';
                                    jQuery('#ahf_doctype_state').closest('.details').append(html);
                                }
                            }
                        break;
                    }
                }
            }
        }



        var grandTotal2El = jQuery('<div id="cfw-grand-total-2" style="font-weight:normal"></div>');
        jQuery('#cfw-grand-total').parent().append(grandTotal2El)

        var superTotalRecalc = function(){
            grandTotal2El.html('calculating..');
            setTimeout(function(){
                var grandTotal = +jQuery('#cfw-grand-total').text().replace( /[^0-9]+/g, '');
                var invoiceTotal = grandTotal + brokerFeeCorrection;
                var invoiceTotal2 = Math.round((grandTotal + brokerFeeCorrection) / 2);
                var customsClearingFee = Math.round(invoiceTotal*30/100); // 30% from invoice
                var customsClearingFee2 = Math.round(invoiceTotal2*30/100); // 30% from invoice
                var pensFundFee = Math.round(invoiceTotal*4/100); // 4%
                var pensFundFee2 = Math.round(invoiceTotal2*4/100); // 4%
                var superTotal = Math.round(invoiceTotal + portFee + customsClearingFee + certFee + pensFundFee);
                var superTotal2 = Math.round(invoiceTotal + portFee + customsClearingFee2 + customsClearingFee2Extra + certFee + pensFundFee2);

                var html = '';
                html +='<hr>';
                html +='<ul>';

                switch (brokerFeeCalcType) {
                    case BROKER_FEE_CALC_TYPE_PARTNER:
                        html +='<li>+ '+brokerFeeCorrection.formatMoney(0, '.', ',')+' $ = Partner Broker Fee</li>';
                    break;
                    case BROKER_FEE_CALC_TYPE_EXTERNAL:
                        html +='<li>+ '+brokerFeeCorrection.formatMoney(0, '.', ',')+' $ = External Broker Fee ( '+externalBrokerFixedFee+'$ - '+transactionFee+'$ )</li>';
                    break;
                }

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
        };

        jQuery('#cfw-current-bid').on('keyup keypress blur change', superTotalRecalc);
        jQuery('#cfw-land-select').on('keyup keypress blur change', superTotalRecalc);
        jQuery('#cfw-world-select').on('keyup keypress blur change', superTotalRecalc);

        jQuery('#cfw-current-bid').trigger("change");

        var descrItem = null;

        descrItem = $(".lot-details-inner").find("span[data-uname='lotdetailOdometervalue']").first();
        if (descrItem.length) {
          var odoValue = descrItem.text().replace(/[^0-9]+/g,'');
          var odoKm = odoValue;
          descrItem.find('p').css('color', 'white');
          if (descrItem.text().indexOf('mi')>0) {
              odoKm = Math.round(odoValue*1.6);
              descrItem.append('<div style="padding-right:15px; font-weight:normal;">'+odoKm.toLocaleString('en')+' km</div>')
          }

          if (odoKm < 1)   {
              descrItem.addClass('ahf_redbox_p35');
          } else if (odoKm < odometrHLLimit_1) {
              descrItem.addClass('ahf_greenbox_p35');
          } else if (odoKm < odometrHLLimit_2) {
              descrItem.addClass('ahf_orangebox_p35');
          } else {
              descrItem.addClass('ahf_redbox_p35');
          }
        }

        var sellerEl = jQuery('#cfw-seller');
        if (sellerEl.length) {
            if (jQuery('#cfw-seller-ok').is(":visible")) {
                var sellerName = sellerEl.text().trim();
                if (sellerName.match(/\s(LLC|INC)[. ]+?$/)) {
                    sellerEl.parent().addClass('ahf_orangebox').addClass('ahf_blink');
                } else {
                    sellerEl.parent().addClass('ahf_greenbox');
                }
            } else if (jQuery('#cfw-seller-warn').is(":visible")) {
                sellerEl.parent().addClass('ahf_redbox').addClass('ahf_blink');
            }
        }

    }, 5000);
})();
