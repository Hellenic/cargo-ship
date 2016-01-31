"use strict";
var Mai = new Model("Machinae Artificial Intelligence", ["models/Mai/Mai.json"]);

Mai.onMaiLoaded = function(geometry, materials)
{
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xAAAAAA }));
    //this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
};

Mai.onLoad = function()
{
    this.mesh.position.set(0, 15, 100);
    ModelService.addModel(this);
};
