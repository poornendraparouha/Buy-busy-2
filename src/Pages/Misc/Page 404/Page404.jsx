// Imports
import styles from "./Page404.module.css";
import { useNavigate } from "react-router-dom";

// Component to show errors here.
export default function Page404() {
  const navigate = useNavigate();
  //  Function to go back page
  const back = () => {
    navigate(-1);
  }

  // Returning Jsx
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorHeading}>404</h1>
        <p className={styles.errorMessage}>Oops! Page not found</p>
        <p className={styles.errorDescription}>
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <button className={styles.errorButton} onClick={back}>Go Back Home</button>
      </div>
    </div>
  );
}
