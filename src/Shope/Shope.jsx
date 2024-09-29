import React from 'react';
import usepagination from '../Hooks/usepagination';
import '../Share/button.css'
import { Link } from 'react-router-dom';

const Shope = () => {
    const { currentProducts, totalProducts, isLoading, page, setPage,itemsPerPage } = usepagination()
    console.log(currentProducts);
    

    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    if (isLoading) return <>Loding...</>

    return (
        <div>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {currentProducts.map(product => (
                    <div key={product._id}>
                        <div className="card  w-[26rem] bg-slate-400 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={product.product_image}
                                    alt="Shoes"
                                    className="rounded-xl object-cover h-80 w-96 object-top" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{product.product_name}</h2>
                                <div>
                                    <p><span className='font-semibold'>price:</span>{product.price}$</p>
                                </div>
                                <div className="card-actions">
                                    <Link to={`/details/${product._id}`} className="btn button">Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='my-10'>
                <div className="flex justify-center mt-4 items-center text-center">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="mr-2 btn"
                    >
                        Previous
                    </button>
                    <span>{`Page ${page} of ${totalPages}`}</span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="ml-2 btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shope;