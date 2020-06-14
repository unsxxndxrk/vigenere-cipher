"use strict";

var
    result    = document.getElementById('result'),
    alfa      = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
    alfaLower = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase(), 
    buttons   = document.getElementsByClassName('button');

for (let i = 0; i < buttons.length; i++)
	buttons[i].addEventListener('click', action);

function action() {
    var
        userText   = document.getElementById('user_text').value,
        userKey    = document.getElementById('user_key').value,
        userDirect = '';
    (this.getAttribute('data-enc') === 'decrypt') ? userDirect = '-': userDirect = '+'; //check for user action
    if (checkData(userText, userKey)) {
        var
            keyArray = createKeyArray(userText, userKey),  //get key array
            encArray = getEncryption(userText, keyArray, userDirect),  //get encrypted numbers
            result   = getResult(encArray, userText);
        message(result.join(''));
    } else { message('Something went wrong :( \n Please check your data and try again'); }
}

function createKeyArray(text, key) {
    var keyArray = new Array();
    for (var i = 0; i < text.length; ) {
        var j = 0;
        while (j < key.length) {
            if (i === text.length) break;
            if (text[i].match(/[0-9!?@#$%^&*.,\s]/g)) {     
                keyArray.push(text[i]);
                i++;
            } else {
                keyArray.push(key[j]);
                j++;
                i++;
            }
        }
    }
    return keyArray;
}

function getEncryption(text, key, direction) {
    var encArray = new Array();
    for (var i = 0; i < text.length; i++) {
        if (text[i].match(/[0-9!?@#$%^&*.,\s]/g)) {   //ignore spaces
            encArray.push(text[i]);
        } else {
            var index = eval('alfa.indexOf(text[i].toUpperCase())' + direction + 'alfa.indexOf(key[i].toUpperCase())');
            if (index > alfa.length - 1) index -= (alfa.length - 1);
            else if (index < 1) index += (alfa.length - 1);
            else if (index === 0) index = (alfa.length - 1);
            encArray.push(index);
        }
    }
    return encArray;
}

function getResult(arr, text) {
    var result = new Array();
    for (var i = 0; i < arr.length; i++) {
    	if (text[i] === text[i].toLowerCase()) (String(arr[i]) === arr[i]) ? result.push(arr[i]): result.push(alfaLower[arr[i]]);
       	else (String(arr[i]) === arr[i]) ? result.push(arr[i]): result.push(alfa[arr[i]]);
    } return result;
}

function checkData(text, key) {
    if (!text.match(/[a-z]/ig) || !key.match(/[a-z]/ig) || key.match(/[0-9!?@#$%^&*]/ig)
        || key.length > text.length || key.match(/\s+/g))
        return false;
    return true;
}

function message(msg) { result.innerHTML = msg; }