// OrderTable component
// Imports
import styles from "./OrderTable.module.css";

// Component for order table here
export default function OrderTable({ order }) {

  // Returning JSX
  return (
    <div className={styles.orderTableContainer}>
      <h1 className={styles.orderCreatedHeading}>{`Order Created On:- ${order.createdAt}`}</h1>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product.title}</td>
              <td>{`₹ ${item.product.price}`}</td>
              <td>{item.qty}</td>
              <td>{`₹ ${item.qty * item.product.price}`}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className={styles.totalRow}>{`₹ ${order.total}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
