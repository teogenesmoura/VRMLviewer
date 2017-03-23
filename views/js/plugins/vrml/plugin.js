function checkNumberInputs(args, e) {
  args.forEach(function(element, index, array) {
    if(!isNumeric(element)) {
      e.preventDefault();
      alert(String(element) + " is not a number");
    }
  })
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

tinymce.PluginManager.add('vrml', function(editor, url) {
  //Add a button that opens a window
  editor.addButton('go', {
    text: 'Go!',
    icon: false,
    onclick: function() {
      var text = tinyMCE.activeEditor.getContent({format : 'text'});
      //console.log($('#tinytextarea'));
      changeScene(text)
    }
  });
  editor.addButton('shape', {
      text: 'Shape',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Shape Editor',
        body: [
          {type: 'checkbox', name: 'appearance', label: 'appearance', class: 'appearance'},
          {type: 'checkbox', name: 'geometry', label: 'geometry', class: 'geometry'}
        ],
        onsubmit: function(e) {

          send_to_editor = '#VRML V2.0 utf8' + "<br />" + 'Shape {' + "<br />";
          
          if (e.data.appearance == true){
            send_to_editor += '&nbsp; appearance' + "<br />";
          } 

          if (e.data.geometry == true){
            send_to_editor += '&nbsp; geometry' + "<br />";
          }

          send_to_editor += '}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  editor.addButton('cone', {
      text: 'Cone',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Cone Editor',
        body: [
          {type: 'textbox', name: 'bottomRadius', label: 'bottomRadius', class: 'bottomRadius', value: '1.0'},
          {type: 'textbox', name: 'height', label: 'height', class: 'height', value: '2.0'},
          {type: 'checkbox', name: 'side', label: 'side', class: 'side'},
          {type: 'checkbox', name: 'bottom', label: 'bottom', class: 'bottom'}
        ],
        onsubmit: function(e) {

          checkNumberInputs([e.data.bottomRadius, e.data.height], e);

          send_to_editor = 'Cone {' + "<br />";

          
          send_to_editor += '&nbsp;&nbsp; bottomRadius ' + e.data.bottomRadius +  "<br />";
          send_to_editor += '&nbsp;&nbsp; height ' + e.data.height +  "<br />";
          
          if (e.data.side == true){
            send_to_editor += '&nbsp;&nbsp; side' + " TRUE <br />";
          } 

          if (e.data.bottom == true){
            send_to_editor += '&nbsp;&nbsp; bottom' + " TRUE <br />";
          } 

          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  //Add Shape button
  editor.addButton('sphere', {
      text: 'Sphere',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Sphere Editor',
        body: [
          {type: 'textbox', name: 'radius', label: 'radius', class: 'radius', value: '1.0'}
        ],
        onsubmit: function(e) {

          checkNumberInputs([e.data.radius], e);

          send_to_editor = 'Sphere {' + "<br />";
          
          send_to_editor += '&nbsp;&nbsp; radius ' + e.data.radius +  "<br />";

          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  //Add Shape button
  editor.addButton('box', {
    text: 'Box',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Box Editor',
        body: [
          {type: 'textbox', name: 'width', label: 'width', class: 'width'},
          {type: 'textbox', name: 'height', label: 'height', class: 'height'},
          {type: 'textbox', name: 'depth', label: 'depth', class: 'depth'},
        ],
        onsubmit: function(e) {

          checkNumberInputs([e.data.width, e.data.height, e.data.depth], e);

          send_to_editor = 'Box {' + "<br />";
          
          send_to_editor += '&nbsp;&nbsp; size ' + e.data.width +  " " + e.data.height + " " + e.data.depth;

          send_to_editor += '<br />   &nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  //Add Shape button
  editor.addButton('cylinder', {
      text: 'Cylinder',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Cylinder Editor',
        body: [
          {type: 'textbox', name: 'radius', label: 'radius', class: 'radius', value: '1.0'},
          {type: 'textbox', name: 'height', label: 'height', class: 'height', value: '1.0'},
        ],
        onsubmit: function(e) {

          checkNumberInputs([e.data.radius, e.data.height], e);

          send_to_editor = 'Cylinder {' + "<br />";
          
          send_to_editor += '&nbsp;&nbsp; radius ' + e.data.radius +  "<br />";

          send_to_editor += '&nbsp;&nbsp; height ' + e.data.height +  "<br />";

          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  editor.addButton('Appearance', {
  text: 'Appearance',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Appearance Editor',
        body: [
          {type: 'checkbox', name: 'material', label: 'material', class: 'side'},
          {type: 'checkbox', name: 'texture', label: 'texture', class: 'bottom'},
          {type: 'checkbox', name: 'textureTransform', label: 'textureTransform', class: 'bottom'}
        ],
        onsubmit: function(e) {

          send_to_editor = 'Appearance {' + "<br />";
          
          if (e.data.material == true){
            send_to_editor += '&nbsp;&nbsp; material' + "<br />";
          } 

          if (e.data.texture == true){
            send_to_editor += '&nbsp;&nbsp; texture' + " <br />";
          } 

          if (e.data.textureTransform == true){
            send_to_editor += '&nbsp;&nbsp; textureTransform' + " <br />";
          } 
          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  editor.addButton('Material', {
  text: 'Material',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Material Editor',
        body: [
          {type: 'textbox', name: 'diffuseColor', label: 'diffuseColor (insira R G B)', class: 'side'},
          {type: 'textbox', name: 'ambientIntensity', label: 'ambientIntensity', class: 'side'},
          {type: 'textbox', name: 'specularColor', label: 'specularColor (insira R G B)', class: 'side'},
          {type: 'textbox', name: 'emissiveColor', label: 'emissiveColor (insira R G B)', class: 'bottom'},
          {type: 'textbox', name: 'shininess', label: 'shininess', class: 'side'},
          {type: 'textbox', name: 'transparency', label: 'transparency', class: 'side'}
        ],
        onsubmit: function(e) {

          send_to_editor = 'Material {' + "<br />";
          send_to_editor += '&nbsp;&nbsp; ambientIntensity ' + e.data.ambientIntensity + " <br />";
          send_to_editor += '&nbsp;&nbsp; diffuseColor ' + e.data.diffuseColor + "<br />";
          send_to_editor += '&nbsp;&nbsp; specularColor ' + e.data.specularColor + " <br />";
          send_to_editor += '&nbsp;&nbsp; emissiveColor ' + e.data.emissiveColor + " <br />";
          send_to_editor += '&nbsp;&nbsp; shininess ' + e.data.shininess + " <br />";          
          send_to_editor += '&nbsp;&nbsp; transparency ' + e.data.transparency + " <br />";
          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  editor.addButton('indexedFaceSet', {
      text: 'IndexedFace',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
        changeSceneVRML(content.trim()); 
      }
  });
});