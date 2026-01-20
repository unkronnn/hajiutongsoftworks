<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import * as THREE from "three";

  interface Props {
    imagePath: string;
    width?: number;
    height?: number;
  }

  let { imagePath, width = 800, height = 450 }: Props = $props();

  let container = $state<HTMLDivElement>(null!);
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let sphere: THREE.Mesh;
  let isUserInteracting = false;
  let onPointerDownMouseX = 0;
  let onPointerDownMouseY = 0;
  let lon = 0;
  let onPointerDownLon = 0;
  let lat = 0;
  let onPointerDownLat = 0;
  let phi = 0;
  let theta = 0;

  function init() {
    if (!browser || !container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 1100);
    camera.position.set(0, 0, 0);

    // Create sphere geometry (inverted to see from inside)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert to see from inside

    // Load texture
    const texture = new THREE.TextureLoader().load(imagePath);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Create material
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });

    // Create mesh
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);

    // Add event listeners
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onWindowResize);

    // Start animation loop
    animate();
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerWidth, containerHeight);
  }

  function onPointerDown(event: PointerEvent) {
    isUserInteracting = true;
    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }

  function onPointerMove(event: PointerEvent) {
    if (isUserInteracting === true) {
      lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    }
  }

  function onPointerUp() {
    isUserInteracting = false;
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
  }

  function update() {
    if (!camera) return;

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
    renderer.render(scene, camera);
  }

  onMount(() => {
    init();

    return () => {
      // Cleanup
      if (container && renderer) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (sphere) {
        sphere.geometry.dispose();
        if (sphere.material instanceof THREE.Material) {
          sphere.material.dispose();
        }
      }
      window.removeEventListener("resize", onWindowResize);
    };
  });
</script>

<div bind:this={container} class="w-full h-full cursor-grab active:cursor-grabbing" style="touch-action: none;"></div>
