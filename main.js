import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight,
0.1,
1000);

const orbit = new OrbitControls(camera, renderer.domElement);
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);
camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(10,10,3);

const gridhelper = new THREE.GridHelper(30);
scene.add(gridhelper);

function animate(time) {
    cube.rotation.x = time/1000;
    cube.rotation.y = time/1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);