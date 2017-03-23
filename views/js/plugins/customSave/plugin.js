tinymce.PluginManager.add('customSave', function(editor, url) {

  function saveTextAsFile(fileName) {
    var textToWrite = tinyMCE.activeEditor.getContent({format : 'text'});
    var textFileAsBlob = new Blob([textToWrite], {type:'x-world/x-vrml'});
    var fileNameToSaveAs = String(fileName) + '.wrl';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }

  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }

  function loadFileAsText() {
    document.getElementById("filePicker").click();
  }

  $("input:file").change(function (){
    var fileToLoad = document.getElementById("filePicker").files[0];
    console.log(fileToLoad);
    var fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {

      var text = fileLoadedEvent.target.result;

      var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
      editor.setContent('');
      organizedText = '';
      for(var i = 0; i < lines.length ; i++) {
        organizedText += lines[i] + "<br />";
      }
      editor.insertContent(organizedText);
      
    }

    fileReader.readAsText(fileToLoad, "UTF-8");
  });

  //Add a button that opens a window
  editor.addButton('saver', {
    text: 'Save',
    icon: 'save',
    onclick: function() {
    editor.windowManager.open({
        title: 'Shape Editor',
        body: [
          {type: 'textbox', name: 'fileName', label: 'Name of the file: ', class: 'height', value: 'project'},
        ],
        onsubmit: function(e) {
          saveTextAsFile(e.data.fileName);
        }
      });
    }
  });

  editor.addButton('loader', {
    text: 'Load',
    icon: 'save',
    onclick: function() {
      loadFileAsText();
    }
  });

});