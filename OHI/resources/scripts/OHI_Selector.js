/**
 * Created by Lia Veja on 16.09.2015.
 */
/*
 Rangy Text Inputs, a cross-browser textarea and text input library plug-in for jQuery.

 Part of Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Depends on jQuery 1.0 or later.

 Copyright 2010, Tim Down
 Licensed under the MIT license.
 Version: 0.1.205
 Build date: 5 November 2010
 Start First
 */
(function(n){function o(e,g){var a=typeof e[g];return a==="function"||!!(a=="object"&&e[g])||a=="unknown"}function p(e,g,a){if(g<0)g+=e.value.length;if(typeof a=="undefined")a=g;if(a<0)a+=e.value.length;return{start:g,end:a}}function k(){return typeof document.body=="object"&&document.body?document.body:document.getElementsByTagName("body")[0]}var i,h,q,l,r,s,t,u,m;n(document).ready(function(){function e(a,b){return function(){var c=this.jquery?this[0]:this,d=c.nodeName.toLowerCase();if(c.nodeType==
    1&&(d=="textarea"||d=="input"&&c.type=="text")){c=[c].concat(Array.prototype.slice.call(arguments));c=a.apply(this,c);if(!b)return c}if(b)return this}}var g=document.createElement("textarea");k().appendChild(g);if(typeof g.selectionStart!="undefined"&&typeof g.selectionEnd!="undefined"){i=function(a){return{start:a.selectionStart,end:a.selectionEnd,length:a.selectionEnd-a.selectionStart,text:a.value.slice(a.selectionStart,a.selectionEnd)}};h=function(a,b,c){b=p(a,b,c);a.selectionStart=b.start;a.selectionEnd=
    b.end};m=function(a,b){if(b)a.selectionEnd=a.selectionStart;else a.selectionStart=a.selectionEnd}}else if(o(g,"createTextRange")&&typeof document.selection=="object"&&document.selection&&o(document.selection,"createRange")){i=function(a){var b=0,c=0,d,f,j;if((j=document.selection.createRange())&&j.parentElement()==a){f=a.value.length;d=a.value.replace(/\r\n/g,"\n");c=a.createTextRange();c.moveToBookmark(j.getBookmark());j=a.createTextRange();j.collapse(false);if(c.compareEndPoints("StartToEnd",j)>
    -1)b=c=f;else{b=-c.moveStart("character",-f);b+=d.slice(0,b).split("\n").length-1;if(c.compareEndPoints("EndToEnd",j)>-1)c=f;else{c=-c.moveEnd("character",-f);c+=d.slice(0,c).split("\n").length-1}}}return{start:b,end:c,length:c-b,text:a.value.slice(b,c)}};h=function(a,b,c){b=p(a,b,c);c=a.createTextRange();var d=b.start-(a.value.slice(0,b.start).split("\r\n").length-1);c.collapse(true);if(b.start==b.end)c.move("character",d);else{c.moveEnd("character",b.end-(a.value.slice(0,b.end).split("\r\n").length-
    1));c.moveStart("character",d)}c.select()};m=function(a,b){var c=document.selection.createRange();c.collapse(b);c.select()}}else{k().removeChild(g);window.console&&window.console.log&&window.console.log("TextInputs module for Rangy not supported in your browser. Reason: No means of finding text input caret position");return}k().removeChild(g);l=function(a,b,c,d){var f;if(b!=c){f=a.value;a.value=f.slice(0,b)+f.slice(c)}d&&h(a,b,b)};q=function(a){var b=i(a);l(a,b.start,b.end,true)};u=function(a){var b=
    i(a),c;if(b.start!=b.end){c=a.value;a.value=c.slice(0,b.start)+c.slice(b.end)}h(a,b.start,b.start);return b.text};r=function(a,b,c,d){var f=a.value;a.value=f.slice(0,c)+b+f.slice(c);if(d){b=c+b.length;h(a,b,b)}};s=function(a,b){var c=i(a),d=a.value;a.value=d.slice(0,c.start)+b+d.slice(c.end);c=c.start+b.length;h(a,c,c)};t=function(a,b,c){var d=i(a),f=a.value;a.value=f.slice(0,d.start)+b+d.text+c+f.slice(d.end);b=d.start+b.length;h(a,b,b+d.length)};n.fn.extend({getSelection:e(i,false),setSelection:e(h,
    true),collapseSelection:e(m,true),deleteSelectedText:e(q,true),deleteText:e(l,true),extractSelectedText:e(u,false),insertText:e(r,true),replaceSelectedText:e(s,true),surroundSelectedText:e(t,true)})})})(jQuery);

/*$(document).ready(function() {
    var $foo = $("#foo");
    $foo.focus();
    $foo.setSelection(0, $foo.val().indexOf("."));
});
/* <input id="foo" value="12345625.40">
* End first */
/* Start Second */
function getSelText()
{
    var txt = '';
    if (window.getSelection)
    {
        txt = window.getSelection();
    }
    else if (document.getSelection)
    {
        txt = document.getSelection();
    }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }
    else return;
    document.aform.selectedtext.value =  txt;
}

/*<input type="button" value="Get selection" onmousedown="getSelText()">

    <form name=aform >
    <textarea name="selectedtext" rows="5" cols="20"></textarea>
    </form>

    End Second
    */
/*Start third*/
var getSelected = function(){
    var t = '';
    if(window.getSelection) {
        t = window.getSelection();
    } else if(document.getSelection) {
        t = document.getSelection();
    } else if(document.selection) {
        t = document.selection.createRange().text;
    }
    return t;
}

$("#myElement").select(function(eventObject) {
    alert(getSelected().toString());
});

//or

$('#myElement').select(function(e) {
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;
    alert($('#myElement').val().substring(start, end));
});




/*<textarea id="myElement" value="Select Me please" col="100" size="10"/>
*
* End Third
* Start Fourth */

function getSelectedTextWithin(el) {
    var selectedText = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection(), rangeCount;
        if ( (rangeCount = sel.rangeCount) > 0 ) {
            var range = document.createRange();
            for (var i = 0, selRange; i < rangeCount; ++i) {
                range.selectNodeContents(el);
                selRange = sel.getRangeAt(i);
                if (selRange.compareBoundaryPoints(range.START_TO_END, range) == 1 && selRange.compareBoundaryPoints(range.END_TO_START, range) == -1) {
                    if (selRange.compareBoundaryPoints(range.START_TO_START, range) == 1) {
                        range.setStart(selRange.startContainer, selRange.startOffset);
                    }
                    if (selRange.compareBoundaryPoints(range.END_TO_END, range) == -1) {
                        range.setEnd(selRange.endContainer, selRange.endOffset);
                    }
                    selectedText += range.toString();
                }
            }
        }
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        var selTextRange = document.selection.createRange();
        var textRange = selTextRange.duplicate();
        textRange.moveToElementText(el);
        if (selTextRange.compareEndPoints("EndToStart", textRange) == 1 && selTextRange.compareEndPoints("StartToEnd", textRange) == -1) {
            if (selTextRange.compareEndPoints("StartToStart", textRange) == 1) {
                textRange.setEndPoint("StartToStart", selTextRange);
            }
            if (selTextRange.compareEndPoints("EndToEnd", textRange) == -1) {
                textRange.setEndPoint("EndToEnd", selTextRange);
            }
            selectedText = textRange.text;
        }
    }
    return selectedText;
}

/*<p id="p1">First paragraph</p>
 <p id="p2">Second paragraph First paragraph First paragraph First paragraphFirst paragraphFirst paragraphFirst paragraphFirst paragraphFirst paragraph</p>
 <p id="p3">Third paragraph</p>

 <input type="button" onclick="alert(getSelectedTextWithin(document.getElementById('p2')))" value="Get selected text in second paragraph">
 End Fourth
 */

function OHI_randomString(string_length) {
    "use strict";
    var chars, randomstring, rnum, i;
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    randomstring = '';
    for (i = 0; i < string_length; i += 1) {
        rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return (randomstring);
}


function createUniqueAnnotationPageNameNew(sect) {
    var pageExists;

    //Generate annotation page name and check if it exists - if it does, pick another.
    pageExists = true;
    var annotationPageName = "";
    while (pageExists) {

        var response, jsonRes;
        var randomString = OHI_randomString(3);
        annotationPageName = 'TextAnnotation' 	  + ':' + wgTitle + '_' +sect+ '-' + randomString;

        response = $.ajax({
            type: "GET", // request type ( GET or POST )
            url: wgScriptPath + '/api.php',
            async: false,
            data: {
                'action': 'query',
                'titles': annotationPageName,
                'format': 'json'
            }
        });
        jsonRes = $.parseJSON(response.responseText);
        if (jsonRes.query.pages.hasOwnProperty("-1") && jsonRes.query.pages['-1'].hasOwnProperty('missing')) {
            pageExists = false;
        }
    }

    return annotationPageName;
}

function createUniqueAnnotationPageNameNew3(sect) {
    var pageExists;

    //Generate annotation page name and check if it exists - if it does, pick another.
    pageExists = true;
    var annotationPageName = "";
    while (pageExists) {

        var response, jsonRes;
        var randomString = OHI_randomString(4);
        annotationPageName =  'TextAnnotation' 	  + ':' + sect+ '-' + randomString;

        response = $.ajax({
            type: "GET", // request type ( GET or POST )
            url: wgScriptPath + '/api.php',
            async: false,
            data: {
                'action': 'query',
                'titles': annotationPageName,
                'format': 'json'
            }
        });
        jsonRes = $.parseJSON(response.responseText);
        if (jsonRes.query.pages.hasOwnProperty("-1") && jsonRes.query.pages['-1'].hasOwnProperty('missing')) {
            pageExists = false;
        }
    }

    return annotationPageName;
}

function createUniqueAnnotationPageNameFsh3(sect) {
    var pageExists;

    //Generate annotation page name and check if it exists - if it does, pick another.
    pageExists = true;
    var annotationPageName = "";
    while (pageExists) {

        var response, jsonRes;
        var randomString = OHI_randomString(4);
        annotationPageName =  'FSH' 	  + ':' + sect+ '-' + randomString;

        response = $.ajax({
            type: "GET", // request type ( GET or POST )
            url: wgScriptPath + '/api.php',
            async: false,
            data: {
                'action': 'query',
                'titles': annotationPageName,
                'format': 'json'
            }
        });
        jsonRes = $.parseJSON(response.responseText);
        if (jsonRes.query.pages.hasOwnProperty("-1") && jsonRes.query.pages['-1'].hasOwnProperty('missing')) {
            pageExists = false;
        }
    }

    return annotationPageName;
}


function OHI_SimpleAsk(content, format, customPrintouts,  type, linkprop , target){
    var url = mw.util.wikiScript();
  //  content = content.replace(/\+/g,"^");
  //  var contE = urlencode(content);
    var contE = content;
    var typeE = encodeURIComponent(type);
    //  var cont = urlencode("<div id='AQE-result-table'>"+content+"</div>");

    //  var tit = "Talk:"+title;
    //   var tit = title;
    var printouts = "";
    if(customPrintouts !== ""){
      //  alert("SimpleAsk: "+customPrintouts);
        for (var key in customPrintouts)
        {
            var value = customPrintouts[key];
            if(value!=="" && value !== null)
                printouts += value.replace(/\?/g,"")+"="+value.replace(/\?/g,"")+"~";
        }
    }
   //   alert(contE);
  //  alert(typeE);
  //  alert(printouts);
    jQuery.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        async: false,
        data: {
            action: 'ajax',
            rs: 'getOHITableSecondLevel',
            //  rs: "simpleAQEAsk",
            //$annotation, $output, $namespace=false, $linkProp=false, $type=false
            rsargs: [contE, printouts, "TextAnnotation:", typeE, "Ist Annotation von Sequenz"] // becomes &rsargs[]=arg1&rsargs[]=arg2...
        },
        //   cache: false,
        success: function(data) {
            /* Call was successful do something with "data" */
         //   alert(data);
               jQuery('#'+target).children("p").remove();
               jQuery('#'+target).children("table").remove();
               jQuery('#'+target).append(data);
               // add class and id to table
               var newTab = target.replace('div','tab');
               jQuery('#'+target).children("table").attr('id',newTab);
               jQuery('#'+newTab+' tr th:first-child').hide();
               jQuery('#'+target).children("table").attr('style','width: 100%;');
               // add column at the end of table with add button annotation 3rd level
               jQuery('#'+newTab+" tr:first").append('<td style="background: #ccc;">&nbsp;</td>');
               jQuery('#'+newTab+" th").css('background', '#ccc');


              //  jQuery('#'+newTab+" tr:first").append("<td ><a href=''>Notiz</a></td>");
              //  jQuery('#'+newTab+" tr:gt(0)").append('<td class="blank-td">&nbsp;</td>');
                var i=1;

                jQuery('#'+newTab+' td:first-child').each(function() {
                    (jQuery(this).hide());
                });
                jQuery('#'+newTab+" tr:gt(0)").each(function() {
                    var hr = jQuery(this).find('td:first-child > a').attr("title");
                 //   alert("hr: "+hr);
                    var val = jQuery(this).find('td:eq(1)').text();
                    var textAdd = "Diskussion";
                    var textEdit = "+FSH";
                    var temp = jQuery(this).closest("div").attr("id");
                    temp = temp.replace("div","tr");
                    jQuery(this).attr("id", temp+"-"+i);
                    var edit = temp.replace("tr", "button-edit");
                    var insert = temp.replace("tr", "button-add");

                    jQuery(this).append('<td style="text-align: right;"><input type="button" value="'+textAdd+'" class="button-notiz" data="'+hr+'" id="'+insert+'-'+i+'" /><input type="button" value="'+textEdit+'" class="button-fsh" data="'+hr+'" id="'+edit+'-'+i+'" /></td>');
                    i++;

                    // TODO add table with new level of annotation - level 3
                    // check if exists comments for each of rows.
                    var content = hr;
                   // content = content.substr(content.lastIndexOf('/') + 1);
                    var printouts = new Array();
                    printouts['Beschreibung'] = "?Beschreibung";
                    printouts['Notiz'] = "?Notiz";
                    printouts['Autor'] = "?Autor";
                    var types = "TextAnnotationLevel3";
                    var target1 = this;
                    var idParent = jQuery(target1).attr("id");
                //    alert(idParent);
                    var newDivId = idParent.replace('level-2','level-3').replace("tr", "div");
                    var newTabId = idParent.replace('level-2','level-3').replace('tr','tab');
                    jQuery('#'+newTabId).children("table").attr('style', 'width: 100%; background-color: #C3EAE9;');
                    OHI_SimpleAsk_New(content, "table", printouts,  types, "", idParent);
                  //  jQuery(this).closest('tr').after('<tr><td>Notiz</td><td colspan="4"><div class="anno-level-3">New Content 2</div></td></tr>');

                });

          //
        }
    });
}

function OHI_SimpleAsk_New(content, format, customPrintouts,  type, options , target){
    var url = mw.util.wikiScript();
    //  content = content.replace(/\+/g,"^");
    //  var contE = urlencode(content);
    var contE = content;
    var typeE = encodeURIComponent(type);
    //  var cont = urlencode("<div id='AQE-result-table'>"+content+"</div>");

    //  var tit = "Talk:"+title;
    //   var tit = title;
    var printouts = "";
    if(customPrintouts !== ""){
        //  alert("SimpleAsk: "+customPrintouts);
        for (var key in customPrintouts)
        {
            var value = customPrintouts[key];
            if(value!=="" && value !== null)
                printouts += value.replace(/\?/g,"")+"="+value.replace(/\?/g,"")+"~";
        }
    }
 //   alert("Link:"+contE);
 //   alert ("Category:"+typeE);

    jQuery.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        async: false,
        data: {
            action: 'ajax',
            rs: 'getOHITableSecondLevel',
            //  rs: "simpleAQEAsk",
            //$annotation, $output, $namespace=false, $linkProp=false, $type=false
            rsargs: [contE, printouts, "TextAnnotation:", typeE, "Ist neue Version von Annotation"] // becomes &rsargs[]=arg1&rsargs[]=arg2...
        },
        //   cache: false,
        success: function(data) {
            /* Call was successful do something with "data" */
             //  alert(data);
            if(data != "") {
                // TODO fix the problem
                var idParent = target;
              //  var idParent = jQuery(target).attr("id");
                //  alert(idParent);
                var newDivId = idParent.replace('level-2','level-3').replace('tr','div');
              //  var newDivId = idParent.replace('button-add','div');
                var newTabId = idParent.replace('level-2','level-3').replace('tr','tab');
              //  var newTabId = idParent.replace('button_add','tab');
              //  var target = jQuery("#"+idParent).find('.div-level-2').attr("id");
             //   var html = jQuery.parseHTML( data );
                var test = jQuery(data);
                test.find('table').attr('id', newTabId );
                test.find('td:first-child').hide();
                test.find('th:first-child').hide();
                var j = 1;
             /*   test.find("tr:gt(0)").each(function() {
                    var hr = jQuery(this).find('td:first-child > a').attr("href");
                    var val = jQuery(this).find('td:eq(1)').text();
                    var textEdit = "bearbeiten";
                    jQuery(this).append('<td><input type="button" value="'+textEdit+'" class="button-edit-4" data="'+hr+'" id="'+newTabId+'-'+j+'" /></td>');
                    j++;
                });*/

              // alert(test);
                jQuery("#"+target).after('<tr><td style="background-color: #C3EAE9;">Diskussion</td><td colspan="5" style="background-color: #C3EAE9;"><div class="anno-level-3" id="'+newDivId+'"></div></td></tr>');
                jQuery('#'+newDivId).append(test);


                // add column at the end of table with add button annotation 3rd level
                //   jQuery('#'+newTab+" tr:first").css('background', '#cc6600');


                //  jQuery('#'+newTab+" tr:first").append("<td ><a href=''>Notiz</a></td>");
                //  jQuery('#'+newTab+" tr:gt(0)").append('<td class="blank-td">&nbsp;</td>');
               /*  var i = 1;
                 jQuery('#'+newTabId+" tr:gt(0)").each(function() {
                     var hr = jQuery(this).find('td:first-child > a').attr("href");
                     var val = jQuery(this).find('td:eq(1)').text();
                     var textEdit = "bearbeiten";
                     jQuery(this).append('<td><input type="button" value="'+textEdit+'" class="button-edit-4" data="'+hr+'" id="button-edit-level-4-'+i+'" /></td>');
                     i++;
                 });*/
                // query for
                //
            }
        }
    });

}

function OHI_saveWikiPageAsk(title, content, type, par_name){
    var api = new mw.Api();
    var contE = urlencode(content);
    var cont = urlencode("<div id='OHI-result-table'>"+content+"</div>");
    var edittoken = mw.user.tokens.get( 'editToken' );
    //  alert(content);
    //  var tit = "Talk:"+title;
    var tit = title;
    var url = mw.util.wikiScript();
    var summary = "Created by OHI Tool";
    api.postWithToken( "edit", {
        action: "edit",
        title: tit,
      //  format: 'wikitext',
        summary: summary,
        text: content
    } ).done( function( result, jqXHR ) {
        mw.log( "Saved successfully" );
        document.location.reload(true);
       // location.reload();
    } ).fail( function( code, result ) {
        if ( code === "http" ) {
            mw.log( "HTTP error: " + result.textStatus ); // result.xhr contains the jqXHR object
        } else if ( code === "ok-but-empty" ) {
            mw.log( "Got an empty response from the server" );
        } else {
            mw.log( "API error: " + code );
        }
    } );

}

function OHI_saveWikiPageContent(title, content){
    var contE = urlencode(content);
    //  alert(cont);
    //  var tit = "Talk:"+title;
    var tit = title;
    var url = mw.util.wikiScript();
    jQuery.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        async: false,
        data: {
            action: 'ajax',
            rs: 'ohi_writeAnnotationPage',
            rsargs: [tit, contE] // becomes &rsargs[]=arg1&rsargs[]=arg2...
        },
        //   cache: false,
        success: function( data ) {
          //  alert(data);
            jQuery('#spinner').fadeOut();
            window.location.reload(true);
          //  location.reload();
        },
        beforeSend: function(){
            jQuery('.loader').show();
        },
        complete: function(){
            jQuery('.loader').hide();
            jQuery('#spinner').fadeOut();
        }
    });
}

function OHI_Galn_Process (parentId, prefix){
    var i = 0;
    jQuery("#"+parentId+" > table tr:gt(0)").each(function() {
        var hr = jQuery(this).find('td:last-child > a').attr("title");
      //  alert("hr: "+hr);
        var val = jQuery(this).find('td:eq(1)').text();
        i++;

        // TODO add table with new level of annotation - level 3
        // check if exists comments for each of rows.
        var content = hr;
        // content = content.substr(content.lastIndexOf('/') + 1);
        var printouts = new Array();
        printouts['Beschreibung'] = "?Beschreibung";
        printouts['Notiz'] = "?Notiz";
        printouts['Autor'] = "?Autor";
        var types = "TextAnnotationLevel3";
        var target1 = this;
        jQuery(target1).attr("id", "tr-"+prefix+"-"+i);
        var idParent = jQuery(target1).attr("id");
     //   alert(idParent);
        //  var newDivId = idParent.replace('level-2','level-3').replace("tr", "div");
        //  var newTabId = idParent.replace('level-2','level-3').replace('tr','tab');
        var newTabId = idParent;
        jQuery('#'+newTabId).children("table").attr('style', 'width: 100%; background-color: #C3EAE9;');
        OHI_SimpleAsk_New(content, "table", printouts,  types, "", idParent);
    });
}

function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/\+/g,"%2B").replace(/%20/g, '+');
}

jQuery(window).load(function() {
   // alert("load!");
    var tit = jQuery('#ws-image').find('a').attr('title');
    jQuery('#ws-image').find('a > img:first').remove();
    jQuery('#ws-image').find('a').text(tit);


});

function onWgAction(){
    // add a button to transkript table
    if (wgAction === "view" && wgCanonicalNamespace === "") {

        //  alert("view");
        var htmlDialogG = '<div id="dialog-form-g" title="Neu" class="AQE-dialog-form" style="display:none;">';
        htmlDialogG += 'Sequenztext:&nbsp;&nbsp;<textarea rows="10" cols="50" id="annotextG" disabled="disabled"  /><br/>';
        htmlDialogG += 'Kurztitel: <input type="text" id="kurztitel" size="50" /><br/><br/>';
        htmlDialogG += 'Beschreibung: <textarea id="bes"  rows="10" cols="50"/><br/>';
        htmlDialogG += 'Notiz: <textarea id="notiztext"  rows="6" cols="50"/><br/>';
        htmlDialogG += '<input type="hidden" id="position"  size=""/><br/>'; // TODO: remove it
        htmlDialogG += '<input type="hidden" id="section"  size=""/>'; // TODO: remove it
        htmlDialogG += '</div>';

        var htmlDialog = '<div id="dialog-form" title="Erstelle Sequenz" class="AQE-dialog-form" style="display:none;"><br/><br/>';
        // htmlDialog += 'Sequenznummer: <input type="text" id="sequenz" size="50"/><br/><br/><br/>';
        // htmlDialog += 'Sequenztext:&nbsp;&nbsp; <input type="text" id="annotation" size="50" /><br/><br/>';
        htmlDialog += 'Sequenztext:&nbsp;&nbsp;<textarea rows="10" cols="50" id="annottext" /><br/>';
        htmlDialog += '<input type="hidden" id="transkripttext"  size=""/><br/>';
        htmlDialog += '<input type="hidden" id="akteur"  size=""/>';
        htmlDialog += '<input type="hidden" id="position"  size=""/>'; // TODO: remove it
        htmlDialog += '<input type="hidden" id="section"  size=""/>'; // TODO: remove it
        htmlDialog += '</div>';

        var htmlDialogC = '<div id="dialog-form-notiz" title="Diskussion" class="AQE-dialog-form" style="display:none;">';
        htmlDialogC += 'Beschreibung: <textarea id="bess"  rows="10" cols="50"/><br/>';
        htmlDialogC += 'Notiz: <textarea id="notiztext2"  rows="20" cols="50"/><br/>';
        //  htmlDialogC += 'Status der Interpretation: <input type="checkbox" id="bes2" checked="checked">Akzeptiert</input><br/>';
        htmlDialogC += '<input type="hidden" id="position2"  size=""/><br/>'; // TODO: remove it
        htmlDialogC += '<input type="hidden" id="section2"  size=""/>'; // TODO: remove it
        htmlDialogC += '</div>';

        var htmlDialogF = '<div id="dialog-form-fsh" title="Fallstrukturhypothese" class="AQE-dialog-form" style="display:none;">';
        htmlDialogF  += 'Fallstrukturhypothese typ: <select id="select-fsh" >';
        htmlDialogF  += '<option value="1" selected>Fallstrukturhypothese 1</option><option value="2">Fallstrukturhypothese 2</option> <option value="3">Fallstrukturhypothese 3</option>';
        htmlDialogF  += '</select><br/>';
        htmlDialogF  += '<input type="hidden" id="position3"  size=""/><br/>'; // TODO: remove it
        htmlDialogF  += '<input type="hidden" id="section3"  size=""/>'; // TODO: remove it
        htmlDialogF  += '</div>';

        var htmlDialogS = '<div id="ajaxSpinnerContainer" >    </div>';

        var c = jQuery("#transkript > table tr th").length;
        //  alert(c);
        var cc = jQuery("#Interpretation table ").length;
        // alert(cc);
        var gg = jQuery("#Geschichten > table tr th").length;
        var aa = jQuery("#Anschl_C3_BCsse > table tr th").length;
        var ll = jQuery("#Lesarten > table tr th").length;
        var nn = jQuery("#Kontextualisierung > table tr th").length;
        jQuery("#Interpretation  table").attr("id", "table-level-1");
        if(c > 0) {
            //  alert(c);

            jQuery("#transkript").append(htmlDialog);
            jQuery("#dialog-form").dialog({
                autoOpen: false,
                height: 400,
                width: 600,
                modal: true,
                close: function() {
                    jQuery( this ).dialog( "close" );
                },
                buttons: {
                    'Speichern': function() {
                        jQuery('#position').val(jQuery('#annottext').val());
                        var annottext = jQuery( "#annottext" ),  notiz =  jQuery( "#notiztext"), section =  jQuery( "#section"), text = jQuery( "#transkripttext"),act = jQuery("#akteur");
                        var title = createUniqueAnnotationPageNameNew(section.val());
                        var myDate = new Date();
                        // alert(myDate.toLocaleString());
                        var min = myDate.getMinutes()<10?'0':'';
                        min = min+myDate.getMinutes();
                        var sec = myDate.getSeconds()<10?'0':'';
                        sec = sec+ myDate.getSeconds();
                        var displayDate =   (myDate.getDate()) + '-' +(myDate.getMonth()+1) + '-' + myDate.getFullYear() + " " + myDate.getHours()+':'+min+':'+sec;

                        //   var options ="{{TextAnnotationNew\n|Initial Text="+text.val()+"\n|AnnoText="+annottext.val()+"\n|Annotation="+anno.val()+"\n|Tag="+tag.text()+"\n|Comment="+notiz.val()+"\n|Equivalent="+wgTitle+"\n|Section="+section.val()+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        var options ="{{TextAnnotationNew\n|Initial Text="+text.val()+"\n|AnnoText="+annottext.val()+"\n|Akteur="+act.val()+"\n|Equivalent="+wgTitle+"\n|Section="+section.val()+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        //alert (options);
                        OHI_saveWikiPageAsk(title, options, "", "");
                        jQuery( this ).dialog( "close" );
                        document.location.reload(true);
                    },
                    "Abbrechen": function() {
                        jQuery( this ).dialog( "close" );
                    }
                }

            });

            //     jQuery("#transkript > table tr:first").css('background', 'blue');

            //   jQuery("#transkript > table tr:first").append("<th><a href=''>Analyse</a></th>");
            jQuery("#transkript > table tr:first").append('<td class="general-th"><input type="button" value="++Sequenz" class="button-general"  id="button-general"  /></td>');
            jQuery("#general-th").removeClass();
            jQuery("#general-th").removeAttr( "role" );
            jQuery("#transkript > table tr:gt(0)").each(function() {
                var hr = jQuery(this).find('td:first-child > a').attr("href");
                var val = jQuery(this).find('td:eq(1)').text();
                jQuery(this).append('<td><input type="checkbox" value="'+val+'" class="button-analyse" data="'+hr+'" id="button-'+val+'" /></td>');
            });
            jQuery('#transkript > table td:first-child').each(function() {
                (jQuery(this).hide());
            });
            jQuery('#transkript > table tr th:first-child').hide();
        } // end if

        if(cc > 0) {
            //  alert("Interpretation");
            jQuery("#Interpretation").append(htmlDialogG);
            jQuery("#Interpretation").append(htmlDialogC);
            jQuery("#Interpretation").append(htmlDialogF);
            jQuery("#Interpretation").append(htmlDialogS);
            jQuery("#dialog-form-g").dialog({
                autoOpen: false,
                height: 600,
                width: 600,
                modal: true,
                close: function() {
                    jQuery( this ).dialog( "close" );
                },
                buttons: {
                    'Speichern': function() {

                        var titel = jQuery( "#kurztitel" ), bes = jQuery( "#bes" ), notiz =  jQuery( "#notiztext"), link =  jQuery( "#section"), type = jQuery("#position"), anno = jQuery("#annotextG");
                        var li = link.val();
                        var content = li.substr(li.lastIndexOf('/') + 1);
                        var ty = type.val();
                        if(ty.indexOf('Ansch') !=-1 ) ty= 'Anschl&#252;sse';
                        var tit = li.substr(li.lastIndexOf('/') + 1);
                        var title = createUniqueAnnotationPageNameNew(titel.val());
                        //  alert(title);
                        var myDate = new Date();
                        // alert(myDate.toLocaleString());
                        var min = myDate.getMinutes()<10?'0':'';
                        min = min+myDate.getMinutes();
                        var sec = myDate.getSeconds()<10?'0':'';
                        sec = sec+ myDate.getSeconds();
                        var displayDate =   (myDate.getDate()) + '-' + (myDate.getMonth()+1) + '-' + myDate.getFullYear() + " " + myDate.getHours()+':' + min + ':' + sec;
                        //  var displayDate = date("d-m-Y h:i:s");
                        //  alert(displayDate);
                        //   var options ="{{TextAnnotationNew\n|Initial Text="+text.val()+"\n|AnnoText="+annottext.val()+"\n|Annotation="+anno.val()+"\n|Tag="+tag.text()+"\n|Comment="+notiz.val()+"\n|Equivalent="+wgTitle+"\n|Section="+section.val()+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        var options ="{{TextAnnotationLevel2\n|Kurztitel="+titel.val()+"\n|Beschreibung="+bes.val()+"\n|Notiz="+notiz.val()+"\n|Type="+ty +"\n|Annotation1="+content+"\n|Status=Nein\n|Equivalent="+wgTitle+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";

                        OHI_saveWikiPageAsk(title, options, "", "");
                        jQuery( this ).dialog( "close" );
                        document.location.reload(true);
                    },
                    "Abbrechen": function() {
                        jQuery( this ).dialog( "close" );
                    }
                }

            });

            jQuery("#dialog-form-notiz").dialog({
                autoOpen: false,
                height: 600,
                width: 600,
                modal: true,
                close: function() {
                    jQuery( this ).dialog( "close" );
                },
                buttons: {
                    'Speichern': function() {

                        var notiz =  jQuery( "#notiztext2"), link =  jQuery( "#section2"), type = jQuery("#position2"), bess = jQuery("#bess");

                        var li = link.val();
                        // alert(li);
                        var content = li.substr(li.lastIndexOf('/') + 1);
                        var tit = li.substr(li.lastIndexOf(':') + 1);
                        var title = createUniqueAnnotationPageNameNew3(tit);
                        //  alert(title);
                        var myDate = new Date();
                        // alert(myDate.toLocaleString());
                        var min = myDate.getMinutes()<10?'0':'';
                        min = min+myDate.getMinutes();
                        var sec = myDate.getSeconds()<10?'0':'';
                        sec = sec+ myDate.getSeconds();
                        var displayDate =   (myDate.getDate()) + '-' + (myDate.getMonth()+1) + '-' + myDate.getFullYear() + " " + myDate.getHours()+':' + min + ':' + sec;
                        //  var displayDate = date("d-m-Y h:i:s");
                        //  alert(displayDate);
                        //   var options ="{{TextAnnotationNew\n|Initial Text="+text.val()+"\n|AnnoText="+annottext.val()+"\n|Annotation="+anno.val()+"\n|Tag="+tag.text()+"\n|Comment="+notiz.val()+"\n|Equivalent="+wgTitle+"\n|Section="+section.val()+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        var options ="{{TextAnnotationLevel3\n|Beschreibung="+bess.val()+"\n|Notiz="+notiz.val()+"\n|Annotation2="+content+"\n|Equivalent="+wgTitle+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        //   alert(options);
                        OHI_saveWikiPageAsk(title, options, "", "");
                        jQuery( this ).dialog( "close" );
                        document.location.reload(true);
                    },
                    "Abbrechen": function() {
                        jQuery( this ).dialog( "close" );
                    }
                }

            });

            jQuery("#dialog-form-fsh").dialog({
                autoOpen: false,
                height: 300,
                width: 300,
                modal: true,
                close: function() {
                    jQuery( this ).dialog( "close" );
                },
                buttons: {
                    'Speichern': function() {

                        var link =  jQuery( "#section3"), type = jQuery("#position3"), bess = jQuery("#select-fsh option:selected");

                        var li = link.val();
                        // alert(li);
                        var title = li.substr(li.lastIndexOf('/') + 1);
                        //   var tit = li.substr(li.lastIndexOf(':') + 1);
                        //   var title = createUniqueAnnotationPageNameFsh3(tit);
                        //   title += "_"+ bess.val();
                        var myDate = new Date();
                        // alert(myDate.toLocaleString());
                        var min = myDate.getMinutes()<10?'0':'';
                        min = min+myDate.getMinutes();
                        var sec = myDate.getSeconds()<10?'0':'';
                        sec = sec+ myDate.getSeconds();
                        var displayDate =   (myDate.getDate()) + '-' + (myDate.getMonth()+1) + '-' + myDate.getFullYear() + " " + myDate.getHours()+':' + min + ':' + sec;
                        //  var displayDate = date("d-m-Y h:i:s");
                        // alert(displayDate);
                        //   var options ="{{TextAnnotationNew\n|Initial Text="+text.val()+"\n|AnnoText="+annottext.val()+"\n|Annotation="+anno.val()+"\n|Tag="+tag.text()+"\n|Comment="+notiz.val()+"\n|Equivalent="+wgTitle+"\n|Section="+section.val()+"\n|Author="+wgUserName+"\n|CreationTime="+displayDate+"\n|SeeAlso=\n}}";
                        var options ="{{StoreFallstrukturhypothese\n|FallStrukturNummer="+bess.val()+"\n|TypAnno="+type.val()+"\n}}";
                        //  alert(options);
                        //   var options = "[[TypAnno::"+type.val()+"]]\n[[FallStrukturNummer::"+bess.val()+"]]\n[[Category:Fallstrukturhypothese"+bess.val()+"]]\n";
                        OHI_saveWikiPageContent(title, options);
                        jQuery( this ).dialog( "close" );
                    },
                    "Abbrechen": function() {
                        jQuery( this ).dialog( "close" );
                    }
                }
            });

            jQuery("#Interpretation  table tr:first").css('background', 'green');


            jQuery("#Interpretation  table tr:first").append("<td ><button name='plus-general' value='+' id='plus-general' class='toggle-general' >+</button></td>");
            jQuery("#Interpretation  table tr:gt(0)").append('<td class="blank-td">&nbsp;</td>');

            jQuery('#Interpretation table tr td:first-child').each(function() {
                (jQuery(this).hide());
            });
            jQuery('#Interpretation table tr th:first-child').hide();
            var val = 1;
            //  $('span[id^="flight"]').closest('tr').after('<tr>This is a new tr</tr>');
            jQuery("#Interpretation  table tr:gt(0)").each(function() {
                var annotation =  jQuery(this).find('td:first-child > a').attr("title");
                var newTableG = '<div id="div-g-'+val+'" style="width: 100%;"><table border="0" style="width: 100%;"><tbody><tr class="expandable-new"><td ><span class="g"><input type="button" value="+" data="'+annotation+'" class="toggle" id="toggle-g-'+val+'"> Geschichten</span></td><td width="5%" align="rigth"><input type="button" value="+G" class="button-g" data="'+annotation+'" id="button-g-'+val+'" /></td></tr>';
                newTableG += '<tr ><td colspan="2"><div id="div-level-2-g-'+val+'" style="width: 100%; display: none;" class="div-level-2"><p>Annotations level 2 table</p></div></td></tr></tbody></table></div>';
                var newTableA = '<div id="div-a-'+val+'" style="width: 100%;"><table border="0" style="width: 100%;"><tbody><tr class="expandable-new"><td ><span class="a"><input type="button" value="+" data="'+annotation+'" class="toggle" id="toggle-a-'+val+'"> Anschl&#252;sse</span></td><td width="5%" align="rigth"><input type="button" value="+A" class="button-a" data="'+annotation+'" id="button-a-'+val+'" /></td></tr>';
                newTableA += '<tr ><td colspan="2"><div id="div-level-2-a-'+val+'" style="width: 100%; display: none;" class="div-level-2"><p>Annotations level 2 table</p></div></td></tr></tbody></table></div>';
                var newTableL = '<div id="div-l-'+val+'" style="width: 100%;"><table border="0" style="width: 100%;"><tbody><tr class="expandable-new"><td ><span class="l"><input type="button" value="+" data="'+annotation+'" class="toggle" id="toggle-l-'+val+'"> Lesarten</span></td><td width="5%" align="rigth"><input type="button" value="+L" class="button-l" data="'+annotation+'" id="button-l-'+val+'" /></td></tr>';
                newTableL += '<tr ><td colspan="2"><div id="div-level-2-l-'+val+'" style="width: 100%; display: none;" class="div-level-2"><p>Annotations level 2 table</p></div></td></tr></tbody></table></div>';
                var newTableN = '<div id="div-n-'+val+'" style="width: 100%;"><table border="0" style="width: 100%;"><tbody><tr class="expandable-new"><td ><span class="n"><input type="button" value="+" data="'+annotation+'" class="toggle" id="toggle-n-'+val+'"> Kontextualisierung</span></td><td width="5%" align="rigth"><input type="button" value="+N" class="button-n" data="'+annotation+'" id="button-n-'+val+'" /></td></tr>';
                newTableN += '<tr ><td colspan="2"><div id="div-level-2-n-'+val+'" style="width: 100%; display: none;" class="div-level-2"><p>Annotations level 2 table</p></div></td></tr></tbody></table></div>';

                jQuery(this).after('<tr class="new-row"><td>&nbsp;</td><td class="new-buttons" colspan="2">'+newTableG+newTableL+newTableA+newTableN+'</td></tr>');
                val++;
            });
        } // endif cc>0
        // start process tabs Geschichten, Anschl_C3_BCsse, Lesarten, Notizen
        if(gg > 0 ) {
            var parentId = 'Geschichten';
            var prefix = "gg";
            OHI_Galn_Process (parentId, prefix);
        }
        if(aa > 0) {
            var parentId = 'Anschl_C3_BCsse';
            var prefix = "aa";
            OHI_Galn_Process (parentId, prefix);
        }
        if(ll > 0) {
            var parentId = 'Lesarten';
            var prefix = "ll";
            OHI_Galn_Process (parentId, prefix);
        }
        if(nn > 0) {
            var parentId = 'Kontextualisierung';
            var prefix = "nn";
            OHI_Galn_Process (parentId, prefix);
        }

    } //endif wgAction

}

function RefreshSomeEventListener() {
    // Remove handler from existing elements
    //  jQuery("#transkript .button-analyse").off();

    // Re-add event handler for all matching elements
    jQuery("#transkript .button-analyse").on("click", function() {
        // Handle event.

        var r= jQuery(this).attr("data");
      //  alert(r);
    });
}

var toogle =  function( event ) {
    var val = jQuery(this).attr("value");
    var content =  jQuery(this).attr("data");
    var idParent = jQuery(this).closest('div').attr("id");
    //  alert(idParent);
    var sp = jQuery(this).closest('span').attr("class");
    var target = jQuery("#"+idParent).find('.div-level-2').attr("id");
    //  alert(target);
    var printouts = new Array();
    printouts['Kurztitel'] = "?Kurztitel";
    printouts['Beschreibung'] = "?Beschreibung";
    printouts['Notiz'] = "?Notiz";
    printouts['Autor'] = "?Autor";
    printouts['FallStrukturNummer'] = "?FallStrukturNummer";
    var type="Geschichte";
    switch(sp.trim()) {
        case "g":
            type="Geschichte";
            break;
        case "l":
            type="Lesart";
            break;
        case "a":
            type="Anschl&#252;sse";
            break;
        case "n":
            type="Notiz";
            break;
        default:
            type="Geschichte";
    }
    if(val.trim() == '+') {
        //   alert(idParent);
        jQuery("#" + idParent).find('.div-level-2').toggle(350);
        jQuery(this).toggleClass("expanded");
        jQuery(this).attr("value","-");
        content = content.substr(content.lastIndexOf('/') + 1);
        OHI_SimpleAsk(content, "table", printouts,  type, "Ist Annotation von Sequenz", target);
    }
    else {
        jQuery("#" + idParent).find('.div-level-2').hide();
        jQuery(this).removeClass("expanded");
        jQuery(this).attr("value","+");
    }
    //  content.slideToggle();
    //   $('.expandable').not(this).find('input[type="button"]').val("+");
}

jQuery( document ).ready(function() {
  // alert("here!");
  /*  $('.ui-tabs-anchor').click( function( event, anchor )
    {
       // window.open( anchor.href, anchor.target, '' );
        event.preventDefault();
        var href = $(this).attr('href');
        alert(href);
        if(href=='#Transkript'){
            document.location.reload(true);
            window.location.href = href;
        }
        else if(href=='#Interpretation') {
            window.location.href = href;
            return false;
        }
    });*/
    onWgAction();

    var edittoken = mw.user.tokens.get( 'editToken' );
    var watchtoken = mw.user.tokens.get( 'watchToken' );
    jQuery("#general-th").removeClass();
    jQuery("#general-th").removeAttr( "role" );
    var myDate = new Date();
   // alert(myDate.toLocaleString());
    var displayDate = (myDate.getDate()) + '-' + (myDate.getMonth()+1) + '-' + myDate.getFullYear() + " " + myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
    var content = jQuery(".div-level-2").hide();
  //  alert(edittoken+ " "+ displayDate);
    jQuery(document).on('click', '.button-general', function(e) {
      //  alert("here");
        // alert(jQuery(this).closest('tr').find('.Transkripttext').text());
      //  jQuery('#transkripttext').val(jQuery(this).closest('tr').find('.Transkripttext').text());
        //  alert( jQuery( this ).attr("data") );
        var c = jQuery( "input:checked" ).length;
      //  alert(c);
        if(c > 0) {
            var area = [];
            var sec = [];
            var act = [];
            jQuery('.button-analyse:checked').each(function(){
                var ac = jQuery(this).closest('tr').find('.Akteur1').text();
                area.push(ac+": "+jQuery(this).closest('tr').find('.Transkripttext').text());
                sec.push(jQuery(this).closest('tr').find('td:eq(1)').text());
                act.push(ac);
            });
            var texttoanno = area.join(';; ');
            sec = sec.join(';');
            var acte = act.join(";");
          //  alert(texttoanno);
            jQuery('#akteur').val(acte);
            jQuery('#annottext').val(texttoanno);
            jQuery('#section').val(sec);

            jQuery("#dialog-form").dialog("open");
        }
    });

    jQuery('.Transkripttext').on('click', function(e)  {
      //  e.preventDefault();
     //   alert("click");
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        var texttoanno = getSelected().toString();
        jQuery('#transkripttext').val(jQuery(this).closest('tr').find('.Transkripttext').text());
        jQuery('#annottext').val(texttoanno);
        jQuery('#section').val(jQuery(this).closest('tr').find('td:eq(1)').text());
        jQuery('#akteur').val(jQuery(this).closest('tr').find('.Akteur1').text());
        //  alert( jQuery( this ).attr("data") );
        jQuery( "#dialog-form" ).dialog( "open" );
        // alert(getSelected().toString());
    });


    jQuery(document).on('change', '.button-analysis', function (e) {
      /*  if (jQuery(this).is(':checked')) {
            console.log('Checked');
        } else {
            console.log('Unchecked');
        }*/
    });

    jQuery(document).on('click', '.button-g', function (e) {
        e.preventDefault();
      //  alert(jQuery(this).closest('tr').find('.g').text());
        var data = jQuery(this).attr("data");
        jQuery('#section').val(data);
        jQuery('#position').val("Geschichte");
        var row = jQuery(this).closest('tr.new-row');
        var text = row.prev('tr').find('td:eq(3)').text();
      //  alert(text);
        jQuery('#annotextG').val(text);
        jQuery( "#dialog-form-g").dialog('option', 'title', 'Neue Geschichte');
        jQuery( "#dialog-form-g" ).dialog( "open" );
    });

    jQuery(document).on('click', '.button-a', function (e) {
        e.preventDefault();
     //   alert(jQuery(this).closest('tr').find('.a').text());
        var data = jQuery(this).attr("data");
        jQuery('#section').val(data);
        jQuery('#position').val("Anschl&uuml;sse");
        var row = jQuery(this).closest('tr.new-row');
        var text = row.prev('tr').find('td:eq(3)').text();
        //  alert(text);
        jQuery('#annotextG').val(text);
        jQuery( "#dialog-form-g").dialog('option', 'title', 'Neue Anschl&uuml;sse');
        jQuery( "#dialog-form-g" ).dialog( "open" );
    });

    jQuery(document).on('click', '.button-l', function (e) {
        e.preventDefault();
     //   alert(jQuery(this).closest('tr').find('.l').text());
        var data = jQuery(this).attr("data");
        jQuery('#section').val(data);
        jQuery('#position').val("Lesart");
        var row = jQuery(this).closest('tr.new-row');
        var text = row.prev('tr').find('td:eq(3)').text();
        //  alert(text);
        jQuery('#annotextG').val(text);
        jQuery( "#dialog-form-g").dialog('option', 'title', 'Neue Lesart ');
        jQuery( "#dialog-form-g" ).dialog( "open" );
    });

    jQuery(document).on('click', '.button-n', function (e) {
        e.preventDefault();
     //   alert(jQuery(this).closest('tr').find('.n').text());
        var data = jQuery(this).attr("data");
        jQuery('#section').val(data);
        jQuery('#position').val("Notiz");
        var row = jQuery(this).closest('tr.new-row');
        var text = row.prev('tr').find('td:eq(3)').text();
        //  alert(text);
        jQuery('#annotextG').val(text);
        jQuery( "#dialog-form-g").dialog('option', 'title', 'Neue Notiz ');
        jQuery( "#dialog-form-g" ).dialog( "open" );
    });
    /*   jQuery("#create-user")
     .click(function(){
     jQuery( "#dialog-form" ).dialog( "open" );
     });*/
 //   jQuery(document).on('click', '.toggle', toogle );
    jQuery(document).on('click', '.toggle', function(e) {
        var val = jQuery(this).attr("value");
        var content =  jQuery(this).attr("data");
        var idParent = jQuery(this).closest('div').attr("id");
        //  alert(idParent);
        var sp = jQuery(this).closest('span').attr("class");
        var target = jQuery("#"+idParent).find('.div-level-2').attr("id");
        //  alert(target);
        var printouts = new Array();
        printouts['Kurztitel'] = "?Kurztitel";
        printouts['Beschreibung'] = "?Beschreibung";
        printouts['Notiz'] = "?Notiz";
        printouts['Autor'] = "?Autor";
        printouts['FallStrukturNummer'] = "?FallStrukturNummer";
        var type="Geschichte";
        switch(sp.trim()) {
            case "g":
                type="Geschichte";
                break;
            case "l":
                type="Lesart";
                break;
            case "a":
                type="Anschl&#252;sse";
                break;
            case "n":
                type="Notiz";
                break;
            default:
                type="Geschichte";
        }
        if(val.trim() == '+') {
            //   alert(idParent);
            jQuery("#" + idParent).find('.div-level-2').toggle(350);
            jQuery(this).toggleClass("expanded");
            jQuery(this).attr("value","-");
            content = content.substr(content.lastIndexOf('/') + 1);
            OHI_SimpleAsk(content, "table", printouts,  type, "Ist Annotation von Sequenz", target);
        }
        else {
            jQuery("#" + idParent).find('.div-level-2').hide();
            jQuery(this).removeClass("expanded");
            jQuery(this).attr("value","+");
        }
        //  content.slideToggle();
        //   $('.expandable').not(this).find('input[type="button"]').val("+");
    });

    jQuery(document).on('click', '.toggle-general', function (e) {
            //   $('.expandable').not(this).nextAll('tr').hide();
            // loop through all the values.
            var valGen = jQuery(this).attr("value");
          //  alert(valGen);
         //   jQuery("#ajaxSpinnerContainer").show();
          /*  jQuery("#ajaxSpinnerContainer").fadeIn();
            var opts = {
                lines: 12, // The number of lines to draw
                length: 7, // The length of each line
                width: 4, // The line thickness
                radius: 10, // The radius of the inner circle
                color: '#000', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false // Whether to use hardware acceleration
            };
            var target = document.getElementById('ajaxSpinnerContainer');
            var spinner = new Spinner(opts).spin(target);*/
         // alert(valGen);
            jQuery('#table-level-1 > tbody > tr.new-row').each(function (index, el) {
                // alert (jQuery(el).html());
                jQuery(el).find("td.new-buttons > div > table > tbody > tr.expandable-new").each(function (i, elem) {
                    //  alert (jQuery(elem).html());
                    jQuery(elem).find('td > span > input').each(function (j, element) {
                        //   alert("here");
                        var val = jQuery(element).attr("value");
                        var id = jQuery(element).attr("id");
                        //  alert(val1);
                        var content = jQuery(element).attr("data");
                        var idParent = jQuery(element).closest('div').attr("id");
                        //console.log(idParent);
                        var sp = jQuery(element).closest('span').attr("class");
                        var target = jQuery("#" + idParent).find('.div-level-2').attr("id");
                        //  alert(target);
                        var printouts = new Array();
                        printouts['Kurztitel'] = "?Kurztitel";
                        printouts['Beschreibung'] = "?Beschreibung";
                        printouts['Notiz'] = "?Notiz";
                        printouts['Autor'] = "?Autor";
                        printouts['FallStrukturNummer'] = "?FallStrukturNummer";
                        var type = "Geschichte";
                        switch (sp.trim()) {
                            case "g":
                                type = "Geschichte";
                                break;
                            case "l":
                                type = "Lesart";
                                break;
                            case "a":
                                type = "Anschl&#252;sse";
                                break;
                            case "n":
                                type = "Notiz";
                                break;
                            default:
                                type = "Geschichte";
                        }
                        if (val.trim() == '+') {
                            //   alert(idParent);
                            jQuery("#" + idParent).find('.div-level-2').toggle(350);
                            jQuery(element).toggleClass("expanded");
                            jQuery(element).attr("value", "-");
                            content = content.substr(content.lastIndexOf('/') + 1);
                            OHI_SimpleAsk(content, "table", printouts, type, "Ist Annotation von Sequenz", target);
                        }
                        else {
                            jQuery("#" + idParent).find('.div-level-2').hide();
                            jQuery(element).removeClass("expanded");
                            jQuery(element).attr("value", "+");
                        }
                    });
                });
            });
            if(valGen.trim() == '+') {
                //   alert(idParent);
                jQuery("#plus-general").toggleClass("expanded");
                jQuery("#plus-general").attr("value","-");
                jQuery("#plus-general").html("-");
            }
            else {
                jQuery("#plus-general").removeClass("expanded");
                jQuery("#plus-general").attr("value","+");
                jQuery("#plus-general").html("+");
            }
           // spinner.stop();
    });

    jQuery(document).on('click', '.button-notiz', function (e) {
        //   $('.expandable').not(this).nextAll('tr').hide();
        var val = jQuery(this).attr("value");
        var content =  jQuery(this).attr("data");
        var idParent = jQuery(this).closest('table').attr("id");
        var kurz = jQuery(this).closest('tr').find(".Kurztitel").html();
      //  alert(kurz);
        var sp="g";
        if(idParent.lastIndexOf("-g-")!=-1)  sp="g";
        else if(idParent.lastIndexOf("-a-")!=-1)  sp="a";
        else if(idParent.lastIndexOf("-l-")!=-1)  sp="l";
        else sp="n";
        var type="Geschichte";
        switch(sp.trim()) {
            case "g":
                type = "Geschichte";
                break;
            case "l":
                type = "Lesart";
                break;
            case "a":
                type = "Anschl&#252;sse";
                break;
            case "n":
                type = "Notiz";
                break;
            default:
                type = "Geschichte";
        }
      //  alert(idParent);
       //add level 3 annotation
        jQuery('#section2').val(content);
        jQuery('#position2').val(type);
        jQuery( "#dialog-form-notiz").dialog('option', 'title', 'Diskussion '+type+" "+kurz);
        jQuery( "#dialog-form-notiz" ).dialog( "open" );
        //  content.slideToggle();
        //   $('.expandable').not(this).find('input[type="button"]').val("+");
    });

    jQuery(document).on('click', '.button-fsh', function (e) {
        //   $('.expandable').not(this).nextAll('tr').hide();
        var val = jQuery(this).attr("value");
        var content =  jQuery(this).attr("data");
        var idParent = jQuery(this).closest('table').attr("id");
        var sp="g";
        if(idParent.lastIndexOf("-g-")!=-1)  sp="g";
        else if(idParent.lastIndexOf("-a-")!=-1)  sp="a";
        else if(idParent.lastIndexOf("-l-")!=-1)  sp="l";
        else sp="n";
        var type="Geschichte";
        switch(sp.trim()) {
            case "g":
                type="Geschichte";
                break;
            case "l":
                type="Lesart";
                break;
            case "a":
                type="Anschl&#252;sse";
                break;
            case "n":
                type="Notiz";
                break;
            default:
                type="Geschichte";
        }
        //  alert(idParent);
        //add level 3 annotation
        jQuery('#section3').val(content);
        jQuery('#position3').val(type);
        jQuery( "#dialog-form-fsh" ).dialog( "open" );
        //  content.slideToggle();
        //   $('.expandable').not(this).find('input[type="button"]').val("+");
    });


});

