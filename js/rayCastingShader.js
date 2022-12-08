class RayCastingShader extends Shader {
    constructor(volume){
        super("singlePass_vert", "color_frag");

        const texture = new THREE.Data3DTexture(volume.voxels, volume.width, volume.height, volume.depth);
        texture.format = THREE.AlphaFormat;
        texture.type = THREE.FloatType;
        texture.needsUpdate = true;
        texture.unpackAlignment = 1;

        this.setUniform("volume", texture);
    }
}