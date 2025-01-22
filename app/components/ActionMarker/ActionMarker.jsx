import { Html } from '@react-three/drei';
import styles from "./styles.module.scss";

function ActionMarker({ position, onClick, label }) {
    return (
        <group position={position}>
          <Html
            className={styles.actionMarker}
            center // Centers the marker
            distanceFactor={5} // Adjusts the size based on distance
          >
            <div onClick={onClick} className={styles.actionMarkerContent}>
              {label && <span className="marker-label">{label}</span>}
            </div>
          </Html>
        </group>
      );
}

export default ActionMarker;