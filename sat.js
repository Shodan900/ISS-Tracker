//setup code
//https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=SJV9SN-F3QXDP-CM8S5V-3W2E

//follwing line doesn't work because of CORS:
// materialSphere.map = new THREE.TextureLoader().load("http://localhost:8000/earthmap1k.jpg");

//TO START LOCAL WEB SERVER TYPE IN CMD: python -m http.server
// then go to http://localhost:8000/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(1200, 1200);
document.body.appendChild(renderer.domElement);

//materials and geometries for the earth
var geometrySphere = new THREE.SphereGeometry(3, 50, 50, 0);
var materialSphere = new THREE.MeshPhongMaterial({color: 0x004d80});
materialSphere.wireframe = true;
//making earth mesh and adding to scene
var earth = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(earth);

//satellite meshes and materials
var satGeo = new THREE.SphereGeometry(0.1, 50, 50, 0);
var satMat = new THREE.MeshPhongMaterial({color: 0xff3300});
var f = new THREE.Mesh(satGeo, satMat);

//without light materialphong and some other materials will not work.
var light1 = new THREE.DirectionalLight( 0xffffff );
var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 0, 1 ).normalize();
light1.position.set( -3, 1, 3).normalize();
scene.add(light);
scene.add(light1);

$.getJSON("https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=SJV9SN-F3QXDP-CM8S5V-3W2E", function(data) {
  p = new Satellite(data);
  satellites.push(p);
  console.log(p);
});
for (var i in satellites) {
  msh = new THREE.Mesh(satGeo, satMat);
  meshes.push(msh);
  meshes[meshes.length-1].position.set(satellites[i].pos.x, satellites[i].pos.y, satellites[i].pos.z);
  scene.add(meshes[meshes.length-1]);
}

var satellites = [];
var p;
var meshes = [];
//update json data, live updating feature.
setInterval(function() {
  $.getJSON("https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=SJV9SN-F3QXDP-CM8S5V-3W2E", function(data) {
    p = new Satellite(data);
    satellites.push(p);
    console.log(p);
  });
  for (var i in satellites) {
    msh = new THREE.Mesh(satGeo, satMat);
    meshes.push(msh);
    meshes[meshes.length-1].position.set(satellites[i].pos.x, satellites[i].pos.y, satellites[i].pos.z);
    scene.add(meshes[meshes.length-1]);
  }
}, 86000);


camera.position.z = 10;
var render = function () {
  requestAnimationFrame(render);
  

  renderer.render(scene, camera);
};

render();