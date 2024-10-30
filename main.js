import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight,
0.1,
1000);

const axeshelper = new THREE.AxesHelper(3);
scene.add(axeshelper);
camera.position.set(0, 2, 5);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

function animate(time) {
    cube.rotation.x = time/1000;
    cube.rotation.y = time/1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);