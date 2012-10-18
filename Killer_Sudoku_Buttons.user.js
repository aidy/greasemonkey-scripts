// ==UserScript==
// @name        Killer Sudoku Buttons
// @namespace   http://www.aidy.net
// @description Provides buttons for killersudokuonline.com
// @include     http://killersudokuonline.com/play.html?*
// @version     1.2
// @grant       none
// ==/UserScript==

var helpTable = document.getElementsByClassName('help')[0];

function htmlButtons(lb) {
    var n = 0;
    var bhtml = '';
    for (i = 0; i < lb.length / 3; i++) {
        bhtml += '<tr>';
        for (j = 0; j < 3; j++) {
            if (lb[n][0]) {
                bhtml += '<td><button style="height: 3em; width: 3em;" id="ksb_' + lb[n][0] + '" onclick="return false;">' + lb[n][1] + '</button></td>';
            } else {
                bhtml += '<td></td>';
            }
            n++;
        }
        bhtml += '</tr>';
    }
    return bhtml;
}

var nums = [];
for (i = 1; i <= 9; i++) { nums.push([i,i]) }; 

var keys = [ [], ['up', '&uarr;'], [], ['left', '&larr;'], ['down', '&darr;'], ['right', '&rarr;'], ['z', '⎌'], ['g', '?'], ['c', 'c']];

helpTable.parentNode.innerHTML = '<div style="padding-left: 6px"><button id="ksb_toggle" onclick="return false;">Toggle controls</button></div>'
                               + '<div id="helptable">'
                               + helpTable.parentNode.innerHTML
                               + '</div><div id="controltable">'
                               + '<table><tbody>' 
                               + htmlButtons(nums) 
                               + '<tr/>'
                               + htmlButtons(keys)
                               + '</tbody></table></div>';

var controlTable = document.getElementById('controltable').childNodes[0];
for(i = 0; i < controlTable.rows.length; i++) {
    controlTable.rows[i].align = 'center';
}
controlTable.cellSpacing = '6px';
controlTable.parentNode.style.display = 'none';
controlTable.parentNode.style.paddingRight = '40px';

function addEL(id, kc) {
    document.getElementById('ksb_' + id).addEventListener(
        'click', 
        function() {
            var eventObj = document.createEventObject ?
                document.createEventObject() : document.createEvent('Events');
    
            if  (eventObj.initEvent) {
                eventObj.initEvent('keyup', true, true);
            }
    
            eventObj.keyCode = kc;
            eventObj.which = kc;
        
            document.body.dispatchEvent ? document.body.dispatchEvent(eventObj) : document.body.fireEvent('onkeyup', eventObj);
        }, 
        false
    );
}

for (i = 1; i < 10; i++) {
    addEL(i, 48 + i);
}

var cursorkeys = ['left', 'up', 'right', 'down'];
for (i = 0; i < 4; i++) {
    addEL(cursorkeys[i], 37 + i);
}

[['c', 67], ['z', 90], ['g', 191]].forEach( function (k) {
    addEL(k[0], k[1]);
});

document.getElementById('ksb_toggle').addEventListener(
    'click',
    function () {
        ['helptable','controltable'].forEach( function (t) {
            var tbl = document.getElementById(t);
            tbl.style.display = tbl.style.display ? '' : 'none';
        })
    },
    false
);
