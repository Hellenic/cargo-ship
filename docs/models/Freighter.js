"use strict";
var Freighter = new Model("Freighter", [
    "models/Freighter/Hull/Hull.json",
    "models/Freighter/Hull/Propeller.json",
    "models/Freighter/1st deck/1FloorBack.json",
    "models/Freighter/1st deck/1FloorFront.json",
    "models/Freighter/2nd deck/2Floor.json",
    "models/Freighter/2nd deck/Stairs.json",
    "models/Freighter/3rd deck/3Floor.json"
]);

Freighter.beforeLoad = function()
{
    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.mesh = new THREE.Mesh(geometry, material, 0.0);
};

Freighter.onMeshLoaded = function(geometry, materials) {
    this.mesh.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xAAAAAA })));
    //this.mesh.add(new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials)));
};

Freighter.onHullLoaded = Freighter.onMeshLoaded;
Freighter.onPropellerLoaded = Freighter.onMeshLoaded;
Freighter.on1FloorBackLoaded = Freighter.onMeshLoaded;
Freighter.on1FloorFrontLoaded = Freighter.onMeshLoaded;
Freighter.on2FloorLoaded = Freighter.onMeshLoaded;
Freighter.onStairsLoaded = Freighter.onMeshLoaded;
Freighter.on3FloorLoaded = Freighter.onMeshLoaded;

Freighter.onLoad = function()
{
    this.mesh.position.set(1000, 0, -20);
    this.mesh.rotation.y = 2.4;

    ModelService.addModel(this);
};
