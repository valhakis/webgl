/* global THREE */
// vim tips
//
// zz -> use it!
// zl zh zL zH zs ze

'use strict';

var width = 300;
var height = 250;

// Global scene object
var scene;

// Global camera object
var camera;

// Global renderer object
var renderer;

window.addEventListener('load', function() {
   renderer = new THREE.WebGLRenderer({antialias:true});

   renderer.setClearColor(0x000000, 1);
   renderer.setSize(width, height);

   document.getElementById('canvas').appendChild(renderer.domElement);

   scene = new THREE.Scene();

   camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);
   camera.position.set(0, 0, 10);
   camera.lookAt(scene.position);
   scene.add(camera);

   var geometry = new THREE.Geometry();
   geometry.vertices.push(new THREE.Vector3(-1.0, -1.0, +0.0));
   geometry.vertices.push(new THREE.Vector3(+1.0, -1.0, +0.0));
   geometry.vertices.push(new THREE.Vector3(+0.0, +1.0, +0.0));
   geometry.faces.push(new THREE.Face3(0, 1, 2));
   var material = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide
   });
   var mesh = new THREE.Mesh(geometry, material);
   mesh.position.set(0.0, 0.0, 4.0);
   scene.add(mesh);

   renderer.render(scene, camera);
});
