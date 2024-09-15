// Order's Page
// Imports
import { useEffect } from "react"
import OrderTable from "../../Components/Order Table/OrderTable";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducer/userReducer";
import { fetchOrders, orderSelector } from "../../Redux/Reducer/OrderReducer";

// Component for the order page
export default function OrderPage() {
    const dispatch = useDispatch();

    // Getting States from reducers here
    const { signedUser } = useSelector(userSelector);
    const { orderLoading, orders } = useSelector(orderSelector);


    // Fetching orders
    useEffect(() => {
        dispatch(fetchOrders(signedUser));
    });

    // Returning JSX
    return (
        <>
            {orderLoading ? <Loader /> : (
                <>
                    <h1 style={{ margin: "2rem", textAlign: "center", color: " #7064E5" }}>{orders.length === 0 ? "You have no orders still!" : "Your Orders"}</h1>
                    {orders.length > 0 && orders.map((order, i) => (
                        <OrderTable key={i} order={order} />
                    ))}
                </>
            )}
        </>
    )
}