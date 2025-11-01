
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xf0c24b, 2.5);
    directionalLight.position.set(2, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x00ffff, 10, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Objects
    const group = new THREE.Group();
    scene.add(group);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xf0c24b, metalness: 0.8, roughness: 0.2 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.y = 0.2;
    group.add(torus);
    
    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 3 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.2;
    group.add(sphere);

    // Stars
    const starVertices: number[] = [];
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.005 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse move for parallax
    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        torus.rotation.y += delta * 0.1;
        torus.rotation.x += delta * 0.05;
        sphere.rotation.x += delta * 0.1;
        sphere.rotation.y += delta * 0.1;
        stars.rotation.x -= delta / 10;
        stars.rotation.y -= delta / 15;

        // Parallax
        const targetCameraX = pointer.x * 0.2;
        const targetCameraY = pointer.y * 0.2;
        camera.position.x += (targetCameraX - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        group.rotation.y += ((pointer.x * Math.PI / 20) - group.rotation.y) * 0.05;
        group.rotation.x += ((-pointer.y * Math.PI / 20) - group.rotation.x) * 0.05;

        renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointermove', onPointerMove);
        cancelAnimationFrame(animationFrameId);
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        torusGeometry.dispose();
        torusMaterial.dispose();
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};
