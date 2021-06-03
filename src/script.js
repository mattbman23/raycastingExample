import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const canvas = document.querySelector("canvas.webgl");
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = 5;

const objLoader = new OBJLoader();

objLoader.load("./teapot.obj", (obj) => {
  obj.traverse((child) => {
    child.material = new THREE.MeshNormalMaterial();
  });
  scene.add(obj);
});

camera.position.z = 5;

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
window.addEventListener("click", (event) => {
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);

  if (found.length > 0 && found[0].object) {
    console.log(found[0].object);
    found[0].object.material.color.set(0xff0000);
  }
});

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
