// Imports
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, userSelector, verifyUserSignIn } from "../../Redux/Reducer/userReducer";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Functional component for the Navbar.
export default function Navbar() {
    // Consuming state from userReducer using useSelector
    const { isSignIn } = useSelector(userSelector);
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();

    // Side effect to check if the user is signedIn or not here from firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                dispatch(verifyUserSignIn({ user: user.uid, signIn: true }));
            } else {
                // No user is signed in
                dispatch(verifyUserSignIn({ user: null, signIn: false }));
            }
        });

        return () => unsubscribe();

    }, [auth, dispatch]);

    // After login take to home page
    useEffect(() => {
        if (isSignIn) {
            navigate("/");
        }
    }, [isSignIn, navigate]);


    // Returning JSx
    return (
        <>
            <div className={styles.navbarContainer}>
                {/* Left side of nav */}
                <div className={styles.left}>
                    <NavLink to="/" className={styles.navLink}>
                        <h3>Busy Buy</h3>
                    </NavLink>
                </div>

                {/* Right side of nav */}
                <ul className={styles.right}>
                    {/* Home */}
                    <li>
                        <NavLink to="/" className={styles.navLink}>
                            <img src="https://cdn-icons-png.flaticon.com/128/609/609803.png" alt="Home" />
                            <h3>Home</h3>
                        </NavLink>
                    </li>

                    {/* If signed in then shows cart and my orders. */}
                    {isSignIn &&
                        <>
                            {/* My orders */}
                            <li>
                                <NavLink to="/orders" className={styles.navLink}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/6815/6815043.png" alt="My Orders" />
                                    <h3>My Orders</h3>
                                </NavLink>
                            </li>

                            {/* Cart */}
                            <li>
                                <NavLink to="/cart" className={styles.navLink}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/891/891407.png" alt="Cart" />
                                    <h3>Cart</h3>
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* Showing conditionally SignIn or Logout here */}
                    <li>
                        <NavLink to="/signIn" className={styles.navLink} onClick={() => isSignIn ? dispatch(logoutAsync()) : null}>
                            <img src={isSignIn ? "https://cdn-icons-png.flaticon.com/128/1828/1828490.png" : "https://cdn-icons-png.flaticon.com/128/2574/2574000.png"} alt="SignIn" />
                            <h3>{isSignIn ? "Logout" : "SignIn"}</h3>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Showing childrens */}
            <Outlet />
        </>
    )
}