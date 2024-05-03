import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function Box(props) {
  const ref = useRef();
  const [clicked, setCliked] = useState(false)

  useFrame(() => ref.current.rotation.x += 0.01)

  return (
    <mesh {...props}
    ref={ref}
    castShadow receiveShadow
    onClick={() => setCliked(!clicked)}
    scale={clicked ? 2 : 1 }>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"}/>
    </mesh>
  )
}

function App({ signOut, user }) {
  return (
    <>
      <div id='canvas-container'>
        <Canvas>
          <mesh>
            <Box position={[-1.6, 0, 0]}/>
            <Box position={[1.6, 0, 0]}/>
            <ambientLight intensity={3.5}/>
            <spotLight position={[10, 15, 10]} intensity={2} angle={0.15} penumbra={1} castShadow/>
            <pointLight position={[-10, -10, -10]} intensity={1.5}/>
            <ambientLight intensity={0.5} />
          </mesh>
        </Canvas>
      </div>
      <h1>Box Color</h1>
      <a href=''>もっと見る</a>
    </>
  );
}

export default withAuthenticator(App);
