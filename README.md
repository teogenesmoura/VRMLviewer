# VRML Viewer

## Introduction 
A Web app that allows users to visualize 3D objects written in the VRML Language. Simply type VRML code on the left, click on "Go!" and see the result on the right side of the screen. App used on the Introduction to Virtual Reality class at the Universidade de Brasília, Brazil. 

## Online demo
https://vrmlviewer.herokuapp.com/views/

## Motivation
Rendering 3D objects is fundamental for learning Virtual Reality nowadays. The current industry-standard language, X3D, is appropriate for building 3D graphics, but when it comes to learning VRML is easier for students without a CS background, which is the case in the Introduction to Virtual Reality class. The softwares that are able to render VRML are dated though, and the one Prof.Dr.Pratini used for the class stopped working with the introduction of Windows 10. Alongside @gbayomi, I built this web app that translates VRML to X3D and renders it into a viewer so that students are able to see what they're creating without worrying about what is happening in the background.

## Getting started
First, install NPM (instructions at https://www.npmjs.com/get-npm). Then type the following into your terminal in a folder you feel comfortable with:
```
git clone https://github.com/teogenesmoura/VRMLviewer.git
cd vrmlviewer && npm install 
node app.js
```
The app should now be running on ```http://localhost:5000/views```

## Tech stack
The app was built using Node JS, Express JS and Ajax.

## Contributing
We could use help with the design of the app that looks a bit grumpy right now. PRs are welcome.

## License
MIT





