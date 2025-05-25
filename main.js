import * as THREE from "three";
import vertex from "./src/Experience/shaders/vertex.glsl";
import fragment from "./src/Experience/shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 11;

// Create renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); //background color white

// Create icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(2, 60);

// Create shader material
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uTime: { value: 0 },
    uColorChange: { value: 0 },
  },
});

const icosahedron = new THREE.Mesh(geometry, material);

icosahedron.position.y = -2;
// Add icosahedron to scene
scene.add(icosahedron);

// GSAP code
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    scrub: 2,
  },
});

tl.to(icosahedron.position, {
  y: 2,
  ease: "power2.inOut",
  z: -3,
},"a")
.to(material.uniforms.uColorChange, {
  value: 1,  
  ease: "power2.inOut",
},"a");

// Render loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime(); // Just get the time
  material.uniforms.uTime.value = elapsedTime; // Directly assign, no multiplication
  //   controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
