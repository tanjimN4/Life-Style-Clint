import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Newarrival = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiospublic=useAxiosPublic()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiospublic.get('products');
                setProducts(response.data); 
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts(); 
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const sortedProducts = products.sort((a, b) => a.price - b.price);

    const topProducts = sortedProducts.slice(0, 4);

    return (
        <div className='mb-10'>
            <div className='my-10'>
                <h1 className='text-3xl font-extrabold'>| New Arrival</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topProducts.map((product, index) => (
                    <div key={index} className=" rounded shadow">
                        <img src={product.product_image} alt={product.product_name} className="w-full h-96 object-top object-cover mb-2 rounded-xl" />
                        <h1 className='text-black font-semibold pb-4'>{product.product_name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Newarrival;
