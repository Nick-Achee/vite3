import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

 const scene = new THREE.Scene();

 const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
 ;

 const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'),
 });

 renderer.setPixelRatio(window.devicePixelRatio );
 renderer.setSize( window.innerWidth, window.innerHeight );
 camera.position.setZ(60);
 camera.position.setY(20);

 renderer.render( scene, camera);

 const geometry = new THREE.TorusGeometry( 3, 4, 40, 3)
 const material = new THREE.MeshStandardMaterial( { color: 0x999888 } );
 const torus = new THREE.Mesh( geometry, material )

 scene.add(torus)


 const nick = new THREE.Mesh(
   new THREE.BoxGeometry(10,10,10),
   new THREE.MeshStandardMaterial( { color: 0x999888 } ),
   
 );
 
 scene.add(nick)
 
nick.position.z = 20
 

 const pointLight = new THREE.PointLight(0xffffff)
 pointLight.position.set(0,40,0)

 const ambientLight = new THREE.AmbientLight(0xffffff)
 
 scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);  

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material )
   
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ) );

  star.position.set(x, y, z)
  scene.add(star)

} 

Array(1000).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load();
scene.background = spaceTexture
 



 function animate() {
   requestAnimationFrame( animate );

   torus.rotation.x += 0.001;
   torus.rotation.y += 0.005;
   torus.rotation.z += 0.0001;

   controls.update();

   renderer.render( scene, camera );

 }

 animate();