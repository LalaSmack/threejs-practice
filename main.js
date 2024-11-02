import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

import space from './public/space2.jpg';

// Scene, Camera, Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight,
0.1,
100);

// OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);
camera.position.set(-10, 30, 30);
orbit.update();

// cube, plane, sphere
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(0,10,-3);
sphere.castShadow = true;

// light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

/* const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(10,30,-20);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.top = 10;

const dLinghtHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLinghtHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);
 */

const spotLight = new THREE.SpotLight(0xffffff, 5000);
scene.add(spotLight);
spotLight.position.set(10,30,-20);
spotLight.angle = 0.6;
spotLight.castShadow = true;
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// fog 
//scene.fog = new THREE.Fog(0xffffff, 0,200);
scene.fog = new THREE.FogExp2(0x7393B3,0.01 );

// background
const loader = new THREE.TextureLoader();
//scene.background = loader.load(space);
const cubeTextureLoader = new THREE.CubeTextureLoader();
const spaceTexture = cubeTextureLoader.load([
    space, space, space, space, space, space
]);
scene.background = spaceTexture;
// dat gui options
const gui = new dat.GUI();
const options = {
    sphereColor: 0x0000ff,
    wireframe: false,
    speed : 0.01,
    angle: 0.6,
    penumbra: 0,
    intensity: 5000
};

gui.addColor(options, 'sphereColor').onChange(function(e) {
    sphereMaterial.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e) {
    sphereMaterial.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0.1, 1);
gui.add(options, 'intensity', 0, 5000);
const gridhelper = new THREE.GridHelper(30);
scene.add(gridhelper);

// animation    
let step = 0;
function animate(time) {
    cube.rotation.x = time/1000;
    cube.rotation.y = time/1000;

    step += options.speed;
    sphere.position.y = Math.abs(Math.sin(step)) * 10;

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);