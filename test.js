var html = require('nanohtml')
var MonoContextual = require('.')

var monocon = new MonoContextual()
var element = monocon.render({ ratio: 75 }, html`
  <div style="background-color:red;width:100%;height:100%">
    I will always maintain a 75% ratio regardless of parent width or height
  </div>
`)

// css reset
document.head.appendChild(html`
  <style>
    body{
      padding:0;
      margin:0;
      width: 100vw;
      height: 100vh;
    }
  </style>
`)

// append element
document.body.appendChild(element)