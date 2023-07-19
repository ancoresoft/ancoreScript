//TOGGLE QLIK ID's OVERLAY 

/*******************************************************
Shout out to Dave Channon!
https://github.com/withdave/qlik-sense-object-id-grabber
********************************************************
*/

/* globals app:false, webix:false, ancoreScript:false */
//Debug your code: Open browser developer console (F12):
//debugger

"use strict"; 
webix.ui({
    view:"window",
    head:"Qlik ID Overlay",
    move:true,
    position:"center",
    close:true,
    width: 200,
    height: 200,
    body:{type:"line", padding:10, rows:[
        {view:"button", css:"webix_primary", label:"Toggle Qlik ID's", click:function(){
                toggleogOverlay();
            }
        }
    ]},
    on:{
        onHide: function(){
            this.close();
        }
    },
}).show();

function toggleogOverlay() {
    // Object Grabber
    // This script adds the ID of every QS object into the bottom right of each object
    // Check to see if there are any ogOverlay divs already on the screen and remove if so
    var ogExistingElements = document.getElementsByClassName("ogOverlay");
    
    // If count is one or more
    if  (ogExistingElements.length>0) {
    
        // Iterate over elements to remove
        while(ogExistingElements.length > 0){
            ogExistingElements[0].parentNode.removeChild(ogExistingElements[0]);    
        }

    } else {
        // If we don't have existing elements on-screen
        // Get list of all object elements. If this doesn't work, try looking for DIVs with attributes set in tid or qva-radial-context-menu
        var ogElements = document.getElementsByClassName("qv-gridcell");
    
        // Iterate over elements
        for (var i=0; i<ogElements.length; i++) {
            var ogElement = ogElements[i];
            if(ogElement.getAttribute("tid")){
            // Build outer div and append
            var ogHtmlOuter = document.createElement("div");
            ogHtmlOuter.style.position = "absolute";
            ogHtmlOuter.style.bottom = 0;
            ogHtmlOuter.style.right = 0;
            ogHtmlOuter.style.zIndex = 2;
            ogHtmlOuter.style.margin = "2px";
            ogHtmlOuter.style.padding = "10px";
            ogHtmlOuter.style.backgroundColor = "#6bb345";
            ogHtmlOuter.style.userSelect = "text";
            ogHtmlOuter.style.color = "#FFFFFF";
            ogHtmlOuter.title = "Click to copy ID to clipboard";
            ogHtmlOuter.className = "ogOverlay";
            ogHtmlOuter.innerHTML = "<a id=\"ogOverlay" + i + "\" onclick=\"ogCopyToClipboard(document.getElementById('ogOverlay" + i + "').innerHTML)\" style=\"color:#FFFFFF;text-decoration:none;user-select:text;title:sss\">" + ogElement.getAttribute("tid") + "</a>";
            ogElement.appendChild(ogHtmlOuter);
    
            }
        }
    }
    
}
// Function to copy to clipboard
window.ogCopyToClipboard = function(string) {
    function listener(e) {
        e.clipboardData.setData("text/plain", string);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    webix.message("Copied " + string + " to clipboard");
}
