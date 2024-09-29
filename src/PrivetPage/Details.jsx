import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';

const Details = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    // console.log(user)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiospublic = useAxiosPublic();
    // console.log(product);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiospublic('products');
                const foundProduct = response.data.find(item => item._id === id);
                setProduct(foundProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, axiospublic]);

    const handleAddToCart = async () => {
        try {

            const data = { ...(Object.keys(product).reduce((acc, key) => {
                if (key !== '_id') acc[key] = product[key];
                return acc;
              }, {})), user_email: user.email, user_name: user.displayName };
            // console.log(data);
            axiospublic.post('/add/chart', data)
            queryClient.invalidateQueries(['addchart']).then(() => {
                queryClient.refetchQueries(['addchart']);
            })
                .then(() => {
                    Swal.fire({
                        title: 'Product Added to Cart',
                        text: 'You have successfully added the product to your cart',
                        icon: 'success',
                    })
                }).catch(error=>{
                    Swal.fire({
                        title: 'Error',
                     text: 'There was an error adding the product to your cart',
                     icon: 'error',
                     })

                })



        } catch (error) {
            console.log(error);

        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }


    return (
        <div className='m-10 p-10 float-none lg:flex bg-slate-400'>
            <div className='lg:w-1/2'>
                <div>
                    <img className='lg:w-[35rem] lg:h-[46rem]' src={product.product_image} alt={product.product_name} />
                </div>
            </div>
            <div className='lg:w-1/2'>
                <h1 className='text-2xl lg:text-3xl font-bold'>| Product Description</h1>

                {typeof product.product_description === 'object' ? (
                    Object.entries(product.product_description).map(([key, value]) => (

                        <p key={key} className='p-2'>
                            <span className='font-bold'>{`${key} : `}</span>{value}
                        </p>

                    ))
                ) : (
                    <p></p> // Fallback for non-object descriptions
                )}
                <Link onClick={handleAddToCart} className='btn button mt-5'>Add To Cart</Link>

            </div>

        </div>
    );
};

export default Details;
