// ==UserScript==
// @name        Killer Sudoku Buttons
// @namespace   http://www.aidy.net
// @description Provides buttons for killersudokuonline.com
// @include     http://killersudokuonline.com/play.html?*
// @version     1.1
// @grant       none
// ==/UserScript==

var helpTable = document.getElementsByClassName('help')[0];
helpTable.cellSpacing = '6px';

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

helpTable.innerHTML = '<tbody>' 
                      + htmlButtons(nums) 
                      + '<tr/>'
                      + htmlButtons(keys)
                      + '</tbody>';

for(i = 0; i < helpTable.rows.length; i++) {
    helpTable.rows[i].align = 'center';
}

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
