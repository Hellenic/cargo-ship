"use strict";
var Snowfall = new Model("Snowfall shader");

Snowfall.onLoad = function()
{
    this.options = {
        count: 1400000,
        multiplier: 1,
        volumeCorner: { x: -50, y: 0, z: -50 },
        volumeSize: { x: 100, y: 100, z: 100 },
        particleScale: 90,
        perlinIntensity: 18.0,
        perlinFrequency: 0.05,
        fadeDistance: 0.1
    };

    this.wind = new THREE.Vector3(90, 0, 30);
    this.gravity = -50;
    this.timeScale = 0.16;
    this.elapsedTime = 0;

    this.mesh = Snowfall.getPointCloud();
    this.mesh.position.set(100, 0, 0);

    ModelService.addModel(this);
};

Snowfall.getPointCloud = function()
{
    // Reset
    if (this.pointCloud)
    {
        this.scene.remove(this.pointCloud);
    }

    Snowfall.createShaderMaterial();
    this.geometry = new THREE.Geometry();
    this.pointCloud = new THREE.PointCloud(this.geometry, this.material);

    // Loop
    var count = this.options.count;
    while(count--)
    {
        this.geometry.vertices.push(new THREE.Vector3(
            Math.random() * this.options.volumeSize.x - this.options.volumeSize.x / 2,
            Math.random() * this.options.volumeSize.y - this.options.volumeSize.y / 2,
            Math.random() * this.options.volumeSize.z - this.options.volumeSize.z / 2
        ));
    }

    return this.pointCloud;
};

Snowfall.createShaderMaterial = function()
{
    this.uniforms   = {};
    this.attributes = {};
    this.material   = null;

    var volumeCorner = new THREE.Vector3(this.options.volumeCorner.x, this.options.volumeCorner.y, this.options.volumeCorner.z);
    var volumeSize = new THREE.Vector3(this.options.volumeSize.x, this.options.volumeSize.y, this.options.volumeSize.z);

    this.uniforms.texture         = { type : 't',  value : THREE.ImageUtils.loadTexture("textures/spark.png") };
    this.uniforms.pixelRatio      = { type : 'f',  value : 1 };
    this.uniforms.volumeCorner    = { type : 'v3', value : volumeCorner };
    this.uniforms.volumeSize      = { type : 'v3', value : volumeSize };
    this.uniforms.offset          = { type : 'v3', value : new THREE.Vector3(0, 0, 0) };
    this.uniforms.perlinIntensity = { type : 'f',  value : this.options.perlinIntensity };
    this.uniforms.perlinFrequency = { type : 'f',  value : this.options.perlinFrequency };
    this.uniforms.time            = { type : 'f',  value : 0 };
    this.uniforms.timeScale       = { type : 'f',  value : this.timeScale };
    this.uniforms.fadeDistance    = { type : 'f',  value : this.options.fadeDistance };
    this.uniforms.particleOpacity = { type : 'f',  value : 1 };
    this.uniforms.particleScale   = { type : 'f',  value : this.options.particleScale };
    this.uniforms.particlesColor  = { type : 'c',  value : new THREE.Color(0xFFFFFF) };
    this.uniforms.depthAtenuation = { type : 'i',  value : true };

    this.material = new THREE.ShaderMaterial(
    {
        attributes     : this.attributes,
        uniforms       : this.uniforms,
        vertexShader   : Shaders["snow.vs"],
        fragmentShader : Shaders["snow.fs"],
        transparent    : true,
        blending       : THREE.AdditiveBlending,
        depthTest      : false,
        depthWrite     : false
    });
};

Snowfall.animate = function()
{
    var delta = 1/60;
    this.elapsedTime += delta;

    // Snow
    this.uniforms.time.value = this.elapsedTime;
    this.uniforms.offset.value.x += this.wind.x * delta * this.timeScale;
    this.uniforms.offset.value.y += this.wind.y * delta * this.timeScale;
    this.uniforms.offset.value.z += this.wind.z * delta * this.timeScale;
    this.uniforms.offset.value.y += this.gravity * delta * this.timeScale;

    // Move snow to Character
    //this.mesh.position.copy(Character.getMesh().position);
};
