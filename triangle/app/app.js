// vim tips
//
// zz -> use it!
// zl zh zL zH zs ze

'use strict';

var gl;
var canvas;

var vertexPositionAttribute;
var shaderProgram;

var width = 300;
var height = 250;

window.addEventListener('load', function() {
   // 1. Load canvas domain element
   canvas = document.getElementById('canvas');
   canvas.width = width;
   canvas.height = height;

   // 2. Initialize GL context
   gl = initWebGL(canvas);

   if (!gl) return;

   // Meanwhile do some more work
   shaderProgram = createShaderProgram();

   gl.useProgram(shaderProgram);

   vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
   gl.enableVertexAttribArray(vertexPositionAttribute);

   var vertices = [
      -0.5, -0.5, 0.0,
      +0.5, -0.5, 0.0,
      +0.0, +0.5, 0.0,
   ];
   
   var vbo = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

   // 3. Do WebGL important work
   gl.viewport(0, 0, width, height);
   gl.clearColor(0.1, 0.1, 0.1, 1.0);
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LEQUAL);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
   gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
   gl.drawArrays(gl.TRIANGLES, 0, 3);
});

function initWebGL(canvas) {
   gl = null;
   gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

   if (!gl) {
      console.log("I'm sorry. I was unable to load webgl.");
   }

   return gl;
}

function createShaderFromSource(source, type) {
   var shader;

   // 1. Create the shader
   if (type == 'v-shader') {
      shader = gl.createShader(gl.VERTEX_SHADER);
   } else if (type == 'f-shader') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
   } else {
      console.log(`Shader can only be 'v-shader' or 'f-shader'`);
   }

   // 2. Compile the shader
   gl.shaderSource(shader, source);
   gl.compileShader(shader);

   // 3. see if there were any compilation errors
   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(`I was unable to compile shader '${type}'`, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
   }

   return shader;
}

function createShaderProgram() {
   var shaderProgram;

   var fragmentShader = createShaderFromSource(`
      void main() {
         gl_FragColor = vec4(0.5, 0.1, 0.0, 1.0);
      }
   `, 'f-shader');

   var vertexShader = createShaderFromSource(`
      attribute vec3 aVertexPosition;

      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;

      void main() {
         gl_Position = vec4(aVertexPosition, 1.0);
      }
   `, 'v-shader');

   // 1. Create the shader program
   shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);

   // 2. Notify if the shader program failed
   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log('Unable to initialize the shader program', gl.getProgramInfoLog(shaderProgram));
   }
   return shaderProgram;
}
