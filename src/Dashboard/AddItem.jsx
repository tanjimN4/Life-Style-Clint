import React, { useContext } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const AddItem = () => {
    const axiospublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const handleAdd = e => {
        e.preventDefault();

        const newProduct = {
            owner_name: user.displayName,
            email: user.email,
            product_name: e.target.itemName.value,
            product_image: e.target.product_image.value,
            category: e.target.category.value,
            product_category: e.target.product_category.value,
            price: parseFloat(e.target.itemPrice.value),
            panding:true,
            product_description: {
                Description: e.target.description.value,
                Fabric: e.target.fabric.value,
                Pattern: e.target.pattern.value,
                Fit: e.target.fit.value,
                Neck: e.target.neck.value,
                Sleeve: e.target.sleeve.value,
                Style: e.target.style.value,
            }
        };

        // Add the new product to the database 
        axiospublic.post('/add/item', newProduct)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Product Added',
                    text: 'Your product has been added successfully',
                    icon: 'success',
                });
            })
            .catch(error => {
                console.error('Error adding product:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding your product.',
                    icon: 'error',
                });
            });
    };

    return (
        <div className="mx-10 p-4 bg-white shadow-md rounded-lg mt-10">
            <h1 className='text-4xl text-center font-extrabold mb-10'>Add Item</h1>
            <form onSubmit={handleAdd} className='text-black space-y-6'>
                {/* Product Name and Price */}
                <div className='flex justify-between'>
                    <div className='flex flex-col w-1/2 pr-2'>
                        <label className='label'>
                            <span className='label-text'>Product Name:</span>
                        </label>
                        <input type="text" name="itemName" className="input input-bordered" placeholder="Enter product name" required />
                    </div>
                    <div className='flex flex-col w-1/2 pl-2'>
                        <label className='label'>
                            <span className='label-text'>Product Price:</span>
                        </label>
                        <input type="number" name="itemPrice" className="input input-bordered" placeholder="Enter product price" required />
                    </div>
                </div>

                {/* Category and Product Category */}
                <div className='flex justify-between'>
                    <div className='flex flex-col w-1/2 pr-2'>
                        <label className='label'>
                            <span className='label-text'>Category:</span>
                        </label>
                        <input type="text" name="category" className="input input-bordered" placeholder="Enter category" required />
                    </div>
                    <div className='flex flex-col w-1/2 pl-2'>
                        <label className='label'>
                            <span className='label-text'>Product Category:</span>
                        </label>
                        <select name="product_category" className="select select-bordered" required>
                            <option value="">Select category</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                </div>

                {/* Product Image URL and Fabric */}
                <div className='flex justify-between'>
                    <div className='flex flex-col w-1/2 pr-2'>
                        <label className='label'>
                            <span className='label-text'>Product Image URL:</span>
                        </label>
                        <input type="text" name="product_image" className="input input-bordered" placeholder="Enter image URL" required />
                    </div>
                    <div className='flex flex-col w-1/2 pl-2'>
                        <label className='label'>
                            <span className='label-text'>Fabric:</span>
                        </label>
                        <input type="text" name="fabric" className="input input-bordered" placeholder="e.g., 100% Cotton" required />
                    </div>
                </div>

                {/* Sleeve and Style */}
                <div className='flex justify-between'>
                    <div className='flex flex-col w-1/2 pr-2'>
                        <label className='label'>
                            <span className='label-text'>Sleeve:</span>
                        </label>
                        <input type="text" name="sleeve" className="input input-bordered" placeholder="Short Sleeve, Long Sleeve" required />
                    </div>
                    <div className='flex flex-col w-1/2 pl-2'>
                        <label className='label'>
                            <span className='label-text'>Style:</span>
                        </label>
                        <input type="text" name="style" className="input input-bordered" placeholder="Casual, Streetwear, etc." required />
                    </div>
                </div>

                {/* Pattern, Fit, and Neck */}
                <div className='flex justify-between'>
                    <div className='flex flex-col w-1/3 pr-2'>
                        <label className='label'>
                            <span className='label-text'>Pattern:</span>
                        </label>
                        <input type="text" name="pattern" className="input input-bordered" placeholder="Printed, Solid, etc." required />
                    </div>
                    <div className='flex flex-col w-1/3 px-2'>
                        <label className='label'>
                            <span className='label-text'>Fit:</span>
                        </label>
                        <input type="text" name="fit" className="input input-bordered" placeholder="Regular, Slim, etc." required />
                    </div>
                    <div className='flex flex-col w-1/3 pl-2'>
                        <label className='label'>
                            <span className='label-text'>Neck:</span>
                        </label>
                        <input type="text" name="neck" className="input input-bordered" placeholder="Crew Neck, V-Neck, etc." required />
                    </div>
                </div>

                {/* Description */}
                <div className='flex flex-col'>
                    <label className='label'>
                        <span className='label-text'>Description:</span>
                    </label>
                    <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Enter product description" required></textarea>
                </div>

                {/* Submit Button */}
                <div className='flex justify-center'>
                    <button type="submit" className="btn btn-primary w-full">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
