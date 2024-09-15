// Imports
import styles from "./Products.module.css";
import Search from "../../Components/Search/Search";
import ProductsList from "../../Components/Products List/ProductsList";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync, handleSearchProductByName, productsSelector } from "../../Redux/Reducer/productsReducer";
import { useEffect } from "react";

// Page for the products
export default function Products() {
    const dispatch = useDispatch();

    // State from products reducer here
    const { productLoading } = useSelector(productsSelector);

    // Dispatching side fetchDataAsync thunk here
    useEffect(() => {
        dispatch(fetchDataAsync());
    }, [dispatch]);

    // Returning Jsx
    return (
        <>
            {/* Showing loader while products loads */}
            {productLoading ? (
                <Loader />
            ) : (
                <>
                    {/* Search Bar */}
                    <div className={styles.searchBarContainer}>
                        <input name="search" type="search" placeholder="Search By Name" className={styles.searchBar} onChange={(event) => dispatch(handleSearchProductByName(event.target.value))} />
                    </div>

                    {/* Search and filter Conatiner */}
                    <div className={styles.searchFilterContainer}>
                        <Search />
                    </div>

                    {/* All products container */}
                    <div className={styles.productsContainer}>
                        <ProductsList />
                    </div>
                </>
            )}
        </>
    )
}