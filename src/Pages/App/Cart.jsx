// Imports
import styles from "./Cart.module.css";
import Loader from "../../Components/Loader/Loader";
import CartItem from "../../Components/Cart Item/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartSelector, fetchCartDataAsync } from "../../Redux/Reducer/cartReducer";
import { userSelector } from "../../Redux/Reducer/userReducer";
import { handleOrder } from "../../Redux/Reducer/OrderReducer";

// Cart page to show items in the user's cart
export default function CartPage() {
    // Consuming reducers
    const { signedUser } = useSelector(userSelector);
    const { cartLoading, cartItems, total } = useSelector(cartSelector);
    const dispatch = useDispatch();

    // Dispatching action to fetch cart data
    useEffect(() => {
        dispatch(fetchCartDataAsync(signedUser));
    }, [signedUser, cartItems, dispatch]);

    // Returning JSX
    return (
        <>
            {cartLoading ? (
                <Loader />
            ) : (
                cartItems.length === 0 ? (
                    <>
                        <h1 className={styles.noItemsHeading}>No items in the cart!</h1>
                    </>
                ) : (
                    <>
                        {/* Total Price */}
                        <div className={styles.cartTotalContainer}>
                            {/* Display total price or other relevant information */}
                            <div className={styles.wrapper}>
                                <p className={styles.heading}>{`TotalPrice:- ₹${total}/-`}</p>
                                <button className={styles.purchaseButton} onClick={() => dispatch(handleOrder({ signedUser, cartItems, total }))}>Purchase</button>
                            </div>
                        </div>

                        {/* Cart Products List */}
                        <div className={styles.cartItemsContainer}>
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    cartItemId={item.id}
                                    title={item.product.title}
                                    price={item.product.price}
                                    image={item.product.image}
                                    qty={item.qty}
                                />
                            ))}
                        </div>
                    </>
                )
            )}
        </>
    );
}
