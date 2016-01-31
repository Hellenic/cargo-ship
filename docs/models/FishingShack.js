"use strict";
var FishingShack = new Model("Fishing Shack", [
    "models/FishingShack/Barrels.json",
    "models/FishingShack/Bed.json",
    "models/FishingShack/Boxes.json",
    "models/FishingShack/Door.json",
    "models/FishingShack/Firewood.json",
    "models/FishingShack/Net.json",
    "models/FishingShack/Rack.json",
    "models/FishingShack/RodStash.json",
    "models/FishingShack/Roof.json",
    "models/FishingShack/Shack.json",
    "models/FishingShack/Shelf.json",
    "models/FishingShack/Stool.json",
    "models/FishingShack/Table.json"
]);

FishingShack.beforeLoad = function()
{
    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    material = Physijs.createMaterial(material, 15.0, 0.0);
    this.mesh = new Physijs.BoxMesh(geometry, material, 0.0);
};
FishingShack.onBarrelsLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/barrel-texture.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onBedLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onBoxesLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onDoorLoaded = function(model, materials)
{
    // Door base material
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-shack.jpg");

    // Door handle
    materials[1].metal = true;
    materials[1].shininess = 80;

    // Note! Here too, box would be enough but using ConvexMesh
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onFirewoodLoaded = function(model, materials)
{
    // Log barks
    materials[0].map = THREE.ImageUtils.loadTexture("textures/log-bark.jpg");

    // Log cuts
    materials[1].map = THREE.ImageUtils.loadTexture("textures/log-cut.jpg");

    // Pile
    materials[2].map = THREE.ImageUtils.loadTexture("textures/log-pile.jpg");

    // Note! Here too, box would be enough but using ConvexMesh
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onNetLoaded = function(model, materials)
{
    var netTexture = THREE.ImageUtils.loadTexture("textures/net-texture.png");
    netTexture.wrapS = netTexture.wrapT = THREE.RepeatWrapping;
    netTexture.repeat.set(2, 2);
    netTexture.needsUpdate = true;
    materials[0].map = netTexture;
    materials[0].side = THREE.DoubleSide;
    materials[0].transparent = true;

    // TODO I shouldn't need to re-do this here, should be in the export from Blender
    materials[1] = new THREE.MeshBasicMaterial({ color: 0x330800, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors, opacity: 0.7 });
    materials[2] = new THREE.MeshBasicMaterial({ color: 0x42321C, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors });
    materials[3] = new THREE.MeshPhongMaterial({ ambient: 0xA9AF8C, color: 0xA9AF8C, specular: 0x005599, shininess: 50, shading: THREE.SmoothShading });
    materials[4] = new THREE.MeshPhongMaterial({ ambient: 0xE7E7E7, color: 0xA9AF8C, specular: 0x005599, shininess: 50, shading: THREE.SmoothShading });
    materials[5] = new THREE.MeshPhongMaterial({ ambient: 0xA04A46, color: 0xA9AF8C, specular: 0x005599, shininess: 50, shading: THREE.SmoothShading });
    materials[6] = new THREE.MeshPhongMaterial({ ambient: 0x42321C, color: 0xA9AF8C, specular: 0x005599, shininess: 50, shading: THREE.SmoothShading });

    this.net = {};
    this.net.mesh = new THREE.Mesh(model, new THREE.MeshFaceMaterial(materials), 0.0);
    this.net.mesh.position.set(18.7, 24.5, 12.5);
    this.net.rotating = true;

    this.mesh.add(this.net.mesh);
};
FishingShack.onRackLoaded = function(model, materials)
{
    //materials[0].map = THREE.ImageUtils.loadTexture("textures/rack-texture.jpg");

    var mesh = new THREE.Mesh(model, new THREE.MeshFaceMaterial(materials), 0.0);

    this.mesh.add(mesh);
    ActionService.registerAction(mesh, "LuShang.json");
};
FishingShack.onRodStashLoaded = function(model, materials)
{
    var rackMaterial = materials[0];
    rackMaterial.map = THREE.ImageUtils.loadTexture("textures/rack-texture.jpg");
    rackMaterial = Physijs.createMaterial(rackMaterial, 15.0, 0.0);

    this.mesh.add(new Physijs.ConvexMesh(model, rackMaterial, 10.0));
};
FishingShack.onRoofLoaded = function(model, materials)
{
    // Roof base material
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-shack.jpg");

    // Roof pillars
    materials[1].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");

    this.mesh.add(new THREE.Mesh(model, new THREE.MeshFaceMaterial(materials)));
};
FishingShack.onShackLoaded = function(model, materials)
{
    // Shack base material
    var baseTexture = THREE.ImageUtils.loadTexture("textures/wood-shack.jpg");
    baseTexture.wrapS = baseTexture.wrapT = THREE.RepeatWrapping;
    baseTexture.anisotropy = 16;
    materials[0].map = baseTexture;

    // Shack upper wall material
    materials[1].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");

    // Shack corner material
    materials[2].map = THREE.ImageUtils.loadTexture("textures/wood-shack2.jpg");

    // Shack front walls
    var frontWallTexture = THREE.ImageUtils.loadTexture("textures/wood-shack-wall.jpg");
    frontWallTexture.anisotropy = 16;
    materials[3].map = frontWallTexture;

    // Rudder on the wall
    materials[4].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");

    // Build physics
    var shackPhysics = FishingShack.buildShackPhysicsMesh();

    this.mesh.add(new THREE.Mesh(model, new THREE.MeshFaceMaterial(materials)));
    this.mesh.add(shackPhysics);
};
FishingShack.buildShackPhysicsMesh = function()
{
    // Build shack physic from boxes since Concave / Convex mesh do not meet the requirements
    var physicsMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, visible: false });

    var floorBox = new THREE.BoxGeometry(33.0, 2.0, 50.0);
    var shackPhysics = new Physijs.BoxMesh(floorBox, physicsMaterial, 0.0);

    var wideWallBox = new THREE.BoxGeometry(1.0, 50.0, 50.0);
    var frontWallPhysics = new Physijs.BoxMesh(wideWallBox, physicsMaterial, 0.0);
    frontWallPhysics.position.x = -16.4;
    shackPhysics.add(frontWallPhysics);

    var backWallPhysics = new Physijs.BoxMesh(wideWallBox, physicsMaterial, 0.0);
    backWallPhysics.position.x = 16.9;
    shackPhysics.add(backWallPhysics);

    var sideWallBox = new THREE.BoxGeometry(33.0, 50.0, 1.0);
    var sideWallPhysics = new Physijs.BoxMesh(sideWallBox, physicsMaterial, 0.0);
    sideWallPhysics.position.z = -25.7;
    shackPhysics.add(sideWallPhysics);

    var doorWallBox = new THREE.BoxGeometry(17.0, 50.0, 1.0);
    var doorWallPhysics = new Physijs.BoxMesh(doorWallBox, physicsMaterial, 0.0);
    doorWallPhysics.position.x = -8.0;
    doorWallPhysics.position.z = 25.5;
    shackPhysics.add(doorWallPhysics);

    var doorSmallWallBox = new THREE.BoxGeometry(7.5, 50.0, 1.0);
    var doorSmallWallPhysics = new Physijs.BoxMesh(doorSmallWallBox, physicsMaterial, 0.0);
    doorSmallWallPhysics.position.x = 14.0;
    doorSmallWallPhysics.position.z = 25.5;
    shackPhysics.add(doorSmallWallPhysics);

    return shackPhysics;
};
FishingShack.onShelfLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-shack2.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onStoolLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onTableLoaded = function(model, materials)
{
    materials[0].map = THREE.ImageUtils.loadTexture("textures/wood-shack2.jpg");
    materials[1].map = THREE.ImageUtils.loadTexture("textures/wood-texture.jpg");
    this.mesh.add(new Physijs.ConvexMesh(model, new THREE.MeshFaceMaterial(materials), 0.0));
};
FishingShack.onLoad = function()
{
    ModelService.addModel(this);
};
FishingShack.animate = function()
{
    if (this.net.mesh.rotation.z > 0.2)
    {
        this.net.rotating = false;
    }
    else if (this.net.mesh.rotation.z < 0)
    {
        this.net.rotating = true;
    }

    if (this.net.rotating)
        this.net.mesh.rotation.z += 0.005;
    else
        this.net.mesh.rotation.z -= 0.005;
};
