import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
    google:{
        families:[
  'Roboto:100,300,400,500,700,900',
  'Open+Sans:300,400,600,700,800',
  'Montserrat:100,200,300,400,500,600,700,800,900',
  'Lato:100,300,400,700,900',
  'Oswald:200,300,400,500,600,700',
  'Raleway:100,200,300,400,500,600,700,800,900',
  'PT+Sans:400,700',
  'Ubuntu:300,400,500,700,900',
  'Nunito:200,300,400,600,700,800,900',
  'Playfair+Display:400,700,900',
  'Merriweather:300,300i,400,400i,700,700i,900,900i',
  'Source+Sans+Pro:200,300,400,600,700,900',
  'Poppins:100,200,300,400,500,600,700,800,900',
  'Quicksand:300,400,500,700',
  'Muli:200,300,400,600,700,800,900',
  "Julius+Sans+One:400,700",
  "Whisper:400",
  "Silkscreen:400,700",
  "DM+Serif+Display:400,400i"
        ]
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

