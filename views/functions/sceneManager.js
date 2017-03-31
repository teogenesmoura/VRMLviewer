function changeScene(text) {
	text = formatString(text);
    var obj = {};
    obj['value'] = text;
    sendAjaxData(obj);
}

function formatString(str) {
	str = str.replace(/\n/g, '$');
	str = str.replace(/\s+/g, ' ');
	str = str.replace(/\$/g, '\n');
	return str
}

function changeX3D(content) {
	$("scene").empty();
	$("scene").append(String(content));
  }
/* ENDERECO DE POST PARA PRODUCAO: https://lvisunb.herokuapp.com */
/* ENDERECO DE POST PARA DEBUG: url: 'http://localhost:5000/', */

function sendAjaxData(content) {
	var submit = $.ajax({
        url: 'http://vrmlviewer.herokuapp.com/views/', 
        type: 'POST', 
        data: content,
        error: function(error) {
        console.log("Error - AJAX");
      }
    });
    submit.success(function (data) {
        data = String(data);
        data = data.replace(/\[next\s.wrl\sline\s.*?\]/g, '')
        console.log(data);
        changeX3D(data);
    });
};