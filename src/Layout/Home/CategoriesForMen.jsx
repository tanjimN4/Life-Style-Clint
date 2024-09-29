import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoriesForMen = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiospublic=useAxiosPublic()
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axiospublic('products'); // Fetching data from new.json
                setProducts(response.data); // Set products state with fetched data
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchProducts(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    // Filter products to get only those with product_category equal to 'men'
    const menProducts = products.filter(product => product.product_category === 'Men').slice(0, 8);
    
    return (
        <div>
            <div className="text-3xl font-extrabold my-10">
               | Categories For Men
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {menProducts.length > 0 ? (
                    menProducts.map((product, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <img src={product.product_image} alt={product.product_name} className="w-full h-96 object-top object-cover mb-2" />
                            <h3 className="font-bold text-lg">{product.product_name}</h3>
                            <div className="flex justify-between items-center">
                                <p>Explore Now!</p>
                                <Link to={`/details/${product._id}`}><FaArrowRight /></Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No products available in this category.</div>
                )}
            </div>
        </div>
    );
};

export default CategoriesForMen;
