// Imports
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInActionCalled, signInAsync, userSelector } from "../../Redux/Reducer/userReducer";
import { ClipLoader } from "react-spinners";

// Functional component for the signin
export default function Login() {
    // Creating state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    // Consuming state from user reducer
    const { loading } = useSelector(userSelector);

    // Calling Sign In
    const handleSignIn = (e) => {
        dispatch(signInActionCalled());
        e.preventDefault(); // Prevent default form submission
        dispatch(signInAsync({ email, password })) // Trigger signin logic dispatching action here
        setEmail("");
        setPassword("");
    };

    // Returning JSX
    return (
        <div className={styles.signInContainer}>
            {/* Sign In form */}
            <form className={styles.signinForm} onSubmit={handleSignIn}>
                <h1 className={styles.heading}>Sign In</h1>
                <input value={email} type="email" required={true} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} type="password" required={true} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={styles.signinBtn}>
                    {loading ? (
                        <ClipLoader color={"#ffffff"} loading={true} size={20} />
                    ) : (
                        "Sign In"
                    )}
                </button>
                {/* Routing to the sign up page */}
                <Link to="/signUp" className={styles.signUpLink}>
                    <p>Or SignUp instead</p>
                </Link>
            </form>
        </div>
    )
}