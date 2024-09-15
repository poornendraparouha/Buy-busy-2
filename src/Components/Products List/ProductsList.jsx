// Imports
import { useSelector } from "react-redux";
import ProductsCard from "../Product Card/ProductCard"
import styles from "./ProductsList.module.css"
import { productsSelector } from "../../Redux/Reducer/productsReducer";

// Page for the Prdouct's List
export default function ProductsList() {
    // States from products reducer here
    const { products, isFiltered, filteredProducts } = useSelector(productsSelector);

    // Returning Jsx
    return (
        <div className={styles.productListConatiner}>
            {isFiltered ? filteredProducts.map((product) => (
                <ProductsCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                />
            )) : products.map((product) => (
                <ProductsCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                />

            ))}
        </div>
    )
}