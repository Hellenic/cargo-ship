"use strict";
var ShaderBox = new Model("Debug Shader box");

ShaderBox.onLoad = function()
{
    var geometry = new THREE.BoxGeometry(20.0, 20.0, 20.0);
    var material = ShaderBox.getShaderMaterial();

    material = Physijs.createMaterial(material, 0.1, 10.0);
    this.mesh = new Physijs.BoxMesh(geometry, material, 1.0);
    //this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 15, 200);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;

    ModelService.addModel(this);
    ActionService.registerAction(this.mesh, "ShaderBox.json");
};

ShaderBox.getShaderMaterial = function()
{
    var shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: Shaders["basic.vs"],
        fragmentShader: Shaders["basic.fs"]
    });

    return shaderMaterial;
};
