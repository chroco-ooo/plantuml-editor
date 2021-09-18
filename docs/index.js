var textarea = document.getElementById('aaaaaa');
// var myCodeMirror = CodeMirror(textarea);
var jsEditor = CodeMirror.fromTextArea(textarea, {
    mode: "Markdown",
    lineNumbers: true,
    indentUnit: 20,
    theme: 'ayu-dark'  // <- テーマの名前
});
jsEditor.save();