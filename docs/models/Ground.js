"use strict";
var Ground = new Model("Ground", ["models/Ground/Terrain.json", "models/Ground/Lake.json",
// Nicely hacked physics for terrain
"models/Ground/Physic0.json","models/Ground/Physic1.json","models/Ground/Physic2.json","models/Ground/Physic3.json",
"models/Ground/Physic4.json","models/Ground/Physic5.json","models/Ground/Physic6.json","models/Ground/Physic7.json",
"models/Ground/Physic8.json","models/Ground/Physic9.json","models/Ground/Physic10.json","models/Ground/Physic11.json",
"models/Ground/Physic12.json",
"models/Ground/Physic21.json","models/Ground/Physic22.json","models/Ground/Physic23.json",
"models/Ground/PhysicObject0.json","models/Ground/PhysicObject1.json","models/Ground/PhysicObject2.json","models/Ground/PhysicObject3.json",
"models/Ground/PhysicGround0.json","models/Ground/PhysicGround1.json","models/Ground/PhysicGround2.json"]);

Ground.beforeLoad = function()
{
    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    material = Physijs.createMaterial(material, 4.0, 0.0);
    this.mesh = new Physijs.BoxMesh(geometry, material, 0.0);

    this.physicsMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, visible: false });
};

Ground.onTerrainLoaded = function(geometry, materials)
{
    var material = new THREE.MeshFaceMaterial(materials);
    var mesh = new THREE.Mesh(geometry, material, 0);
    this.mesh.add(mesh);
};
Ground.onLakeLoaded = function(geometry, materials)
{
    this.mesh.add(new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials), 0.0));
};

Ground.onConvexPhysicLoaded = function(geometry, materials) {
    this.mesh.add(new Physijs.ConvexMesh(geometry, this.physicsMaterial, 0.0));
};
Ground.onPhysic0Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic1Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic2Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic3Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic4Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic5Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic6Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic7Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic8Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic9Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic10Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic11Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic12Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic21Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic22Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysic23Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicObject0Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicObject1Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicObject2Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicObject3Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicGround0Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicGround1Loaded = Ground.onConvexPhysicLoaded;
Ground.onPhysicGround2Loaded = Ground.onConvexPhysicLoaded;

Ground.onLoad = function()
{
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;

    ModelService.addModel(this);
}
