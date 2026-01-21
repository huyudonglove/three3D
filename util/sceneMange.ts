import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export class SceneMange {
    scene = new THREE.Scene();
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    meshes: THREE.Mesh[] = [];
    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    constructor(container: HTMLDivElement) {
        console.log('SceneMange',container);
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 1;
        this.scene.add(this.ambientLight);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
        requestAnimationFrame(this.animate.bind(this));
    }

    addMesh(mesh: THREE.Mesh) {
        this.meshes.push(mesh);
        this.scene.add(mesh);
    }
    addScene(){

    }
    animate() {
        this.meshes.forEach(mesh => {
            mesh.rotation.y += 0.001;
            
        });
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
    loadModel(type:string, url: string) {
        const allModel ={
            "gltf": loadGltf
        }
        return new Promise((resolve, reject) => {
             allModel[type](url).then(model=>{
                console.log('model',model);
                this.addMesh(model);
                resolve(this.meshes);
            })

        });       
    }
    clickEvent(event: MouseEvent) {
        console.log('clickEvent',event);
    }   
}

function loadGltf( url: string) {
    const loader = new GLTFLoader();   
    return new Promise((resolve, reject) => { 
        loader.load(url, (gltf) => {
                resolve(gltf.scene);
            },undefined, (error) => {
                reject(error);
        });

    });    
}