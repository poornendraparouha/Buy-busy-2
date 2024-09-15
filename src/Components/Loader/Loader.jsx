// Imports
import Spinner from 'react-spinner-material';
import styles from "./Loader.module.css";

// Component to show loading while data loads
export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Spinner radius={120} color={"#7064E5"} stroke={2} visible={true} />
    </div>
  );
}