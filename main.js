import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader  = new GLTFLoader();
const light = new THREE.AmbientLight(0x404040, 100.0);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
controls.autoRotate = true;
controls.enableZoom = true;


window.addEventListener('resize', function(){
    width = window.innerWidth;
    height = window.innherHeight;
    renderer.setSize(width, height);
    camera.aspect=width/height;
    camera.updateProjectionMatrix;
});

let ethanol;
loader.load('./3D Models/Ethanol Basic/ethanol.glb', function(gltf) {
    
    const model = gltf.scene;
    scene.add(model);
    ethanol = model;
    ethanol.scale.set(0.25, 0.25, 0.25);
    

}, undefined, function (error) {
    console.error(error);
} );
let dragon;
loader.load('./3D Models/Dragon Test/shadow_dragon.glb', function(gltf) {
    
    const model2 = gltf.scene;
    scene.add(model2);
    dragon = model2;
    dragon.scale.set(100, 100, 100);
    

}, undefined, function (error) {
    console.error(error);
} );

// cube creation

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.scale.set(1, 1, 1);
scene.add(light);

camera.position.z = 5;
controls.update();

function animate() {
    requestAnimationFrame(animate); 
    controls.update();
    renderer.render(scene, camera); 
} 
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = "uhhh so WebGl isnt working on your end, talk to chris about it"
	document.getElementById( 'container' ).appendChild( warning );
}
