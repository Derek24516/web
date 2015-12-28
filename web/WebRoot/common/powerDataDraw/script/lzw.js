function utf8(){

}

utf8.prototype.encode=function(text)
{
    var result = "";
    for (var n = 0; n < text.length; n++)
    {
        var c = text.charCodeAt(n);
        if (c < 128)
        {
            result += String.fromCharCode(c);
        }
        else if (c > 127 && c < 2048)
        {
            result += String.fromCharCode((c >> 6) | 192);
            result += String.fromCharCode((c & 63) | 128);
        }
        else
        {
            result += String.fromCharCode((c >> 12) | 224);
            result += String.fromCharCode(((c >> 6) & 63) | 128);
            result += String.fromCharCode((c & 63) | 128);
        }
    }
    return result;
}

utf8.prototype.decode=function(text)
{
    var result = "";
    var i = 0;
    var c1 = 0;
    var c2= 0;
    var c3 = 0;
    while (i < text.length)
    {
        c1 = text.charCodeAt(i);
        if (c1 < 128)
        {
            result += String.fromCharCode(c1);
            i++;
        }
        else if (c1 > 191 && c1 < 224)
        {
            c2 = text.charCodeAt(i + 1);
            result += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else
        {
            c2 = text.charCodeAt(i + 1);
            c3 = text.charCodeAt(i + 2);
            result += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return result;
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-8-3
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */
/**
 * lzw中文压缩类
 * @type {*}
 */
function lzwcn(){

}

lzwcn.prototype.compress=function(str){
    var s = as3long.utf8.encode(str);
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

lzwcn.prototype.decompress=function(s){
	var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return as3long.utf8.decode(out.join(""));
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-8-3
 * Time: 下午4:50
 * To change this template use File | Settings | File Templates.
 */
function as3long(){

}

as3long.prototype.lzwcn=new lzwcn();
as3long.prototype.utf8=new utf8();
window.as3long=new as3long();