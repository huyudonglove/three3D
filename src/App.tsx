import { useState ,useRef,useEffect, useLayoutEffect} from 'react'

import './App.css'
import {SceneMange} from '../util/sceneMange';
import * as THREE from 'three';
function App() {
  const SceneMangeRef = useRef<SceneMange|null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [meshArray, setMeshArray] = useState<THREE.Mesh[]>([]);
  useLayoutEffect(() => {
      SceneMangeRef.current = new SceneMange(mountRef.current!);
      SceneMangeRef.current.loadModel('gltf', '/31.glb').then((result) => {
        console.log('模型加载完成',result);
        setMeshArray(result as THREE.Mesh[]);
      }).catch((err) => {
        
      });;
      return () => {
          mountRef.current?.removeChild(SceneMangeRef.current!.renderer.domElement);
      }
  }, [])
  function changeColor(mesh:THREE.Mesh){
    const mat = mesh.children[0].material as THREE.MeshStandardMaterial;
    mat.color = new THREE.Color(1, 0, 0);
  }  
  return (
    <>
      <div ref={mountRef} className="App" onClick={(e)=>{SceneMangeRef.current?.clickEvent(e)}}>

      </div>
      <div className='editBox'>
        <div>选择弹窗</div>
        {
          meshArray.map((mesh, index) => (
            <button key={index} onClick={() => changeColor(mesh)}>{mesh.name}</button>
          ))
        }
        
      </div>
    </>
  )
}

export default App
