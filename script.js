// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

// 🔷 Main 3D Object (clean + professional)
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  wireframe: true
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// 🌌 Particle Background
const particlesGeometry = new THREE.BufferGeometry();
const count = 1500;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x00ffff
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 🎬 Animation
function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.002;
  shape.rotation.y += 0.003;

  particles.rotation.y += 0.0003;

  renderer.render(scene, camera);
}

animate();

// 🖱 Mouse interaction
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  shape.rotation.x += y * 0.05;
  shape.rotation.y += x * 0.05;
});

// 📱 Touch support
document.addEventListener("touchmove", (e) => {
  const t = e.touches[0];

  const x = (t.clientX / window.innerWidth - 0.5);
  const y = (t.clientY / window.innerHeight - 0.5);

  shape.rotation.x += y * 0.05;
  shape.rotation.y += x * 0.05;
});

// 🎮 Scroll animation
window.addEventListener("scroll", () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 6 + t * -0.01;
});

// Resize fix
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});