class RayCastingShader extends Shader {
    constructor(volume){
        super("singlePass_vert", "singlePass_frag");

        const texture = new THREE.Data3DTexture(volume.voxels, volume.width, volume.height, volume.depth);
        texture.format = THREE.RedFormat;
        texture.type = THREE.FloatType;
        texture.needsUpdate = true;

        this.setUniform("volume", texture);
    }
}