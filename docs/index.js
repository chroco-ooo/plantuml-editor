var textarea = document.getElementById('editor');
var jsEditor = CodeMirror.fromTextArea(textarea, {
    mode: "Markdown",
    lineNumbers: true,
    theme: 'ayu-dark'  // <- テーマの名前
});
jsEditor.save();

function encode64(data) {
    r = "";
    for (i=0; i<data.length; i+=3) {
        if (i+2==data.length) {
            r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
        } else if (i+1==data.length) {
            r += append3bytes(data.charCodeAt(i), 0, 0);
        } else {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
            data.charCodeAt(i+2));
        }
    }
    return r;
}

function append3bytes(b1, b2, b3) {
    c1 = b1 >> 2;
    c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    c4 = b3 & 0x3F;
    r = "";
    r += encode6bit(c1 & 0x3F);
    r += encode6bit(c2 & 0x3F);
    r += encode6bit(c3 & 0x3F);
    r += encode6bit(c4 & 0x3F);
    return r;
}

function encode6bit(b) {
    if (b < 10) {
    return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
    return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
    return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b == 0) {
    return '-';
    }
    if (b == 1) {
    return '_';
    }
    return '?';
}

function compress(s, type) {
    //UTF8
    var s = unescape(encodeURIComponent(s));
    var url = "https://chroco.ooo/plantuml/" + type + "/" + encode64(deflate(s, 9));
    console.log(url);
    var $img = $('<img>');
    $img.attr('src', url);
    $('#plantImg').html($img);
    $('.invisible').show();
    $('#imageUrl').val(url);
    $('#embed').val($('#plantImg').html());
}

$('#redrawBtn').click(function(){
    jsEditor.save();
    compress($('#editor').val(),'png');
});

$('#saveBtn').click(function(){
    console.log('#saveBtn');
});

$('#pngBtn').click(function(){
    jsEditor.save();
    compress($('#editor').val(),'png');
});

$('#svgBtn').click(function(){
    jsEditor.save();
    compress($('#editor').val(),'svg');
});

$('#imageUrlCopy').click(function(){
    if(navigator.clipboard){
        navigator.clipboard.writeText($('#imageUrl').val());
        // グリップボードにコピーしました。
        alert('グリップボードにコピーしました。');
    } else {
        alert('コピーに失敗しました。しました。');
    }
});

$('#embedCopy').click(function(){
    if(navigator.clipboard){
        navigator.clipboard.writeText($('#embed').val());
        // グリップボードにコピーしました。
        alert('グリップボードにコピーしました。');
    } else {
        alert('コピーに失敗しました。しました。');
    }
});

$('#aboutBtn').click(function(){
    Swal.fire({
        title: 'PlantUML Embed',
        html: `
        PlantUML Embedは、<a href="https://chroco.ooo/" target="_blank">CHROCO</a>で
        「<a href="https://plantuml.com/ja/" target="_blank">PlantUML</a>」を利用するためのEmbedを作成するためのツールです。
        PlantUM Lは、ダイアグラムのような図を素早く作成するためのコンポーネントです。<br><br>
        こちらのツールを活用して CHROCO に図形を挿入してみてください。
        `,
    });
});