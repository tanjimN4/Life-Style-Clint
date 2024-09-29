import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SocilLogin from './SocilLogin';
import { useFormik } from 'formik';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }
    if(!values.name)  {
        errors.name = 'Required';
        }

    return errors;
}


const Register = () => {

    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [checkBoxOne,setCheckBoxOne]=useState(false)
    const [checkBoxTwo,setCheckBoxTwo]=useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const axiosPublic = useAxiosPublic()

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            photo: null,
        },
        validate,
        onSubmit: async (values) => {
            try {

                const formData = new FormData();
                formData.append('file', image);  // Append the image file
                formData.append('upload_preset', uploadPreset);  // Required preset
                formData.append('cloud_name', cloudName);  // Your Cloudinary cloud name

                // Post to Cloudinary
                const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
                const imageUrl = cloudinaryRes.data.secure_url;  // Get uploaded image URL

                createUser(values.email, values.password)
                    .then(() => {
                        updateUserProfile(values.name, imageUrl)
                            .then(() => {
                                const userData = {
                                    email: values.email,
                                    name: values.name,
                                    photo: imageUrl
                                }
                                axiosPublic.post('/users', userData)
                                    .then(() => {
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'Your account has been created.',
                                            icon: 'success',
                                            confirmButtonText: 'Okay',
                                        });

                                        // Reset the form and image states
                                        formik.resetForm();
                                        setImage('');
                                        setImagePreview(null);
                                    })
                            })
                    })
            } catch (error) {
                console.error(error); // Log the error for debugging
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        },
    });

    const handleImageChange = event => {
        const newImage = event.target.files[0];
        if (newImage) {
            setImage(newImage);
            formik.setFieldValue('photo', newImage);

            // Create a preview URL for the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(newImage);
        }
    }

    const handleCheck=e=>{
        const {name,checked}=e.target
        if(name==='checkOne'){
            setCheckBoxOne(checked)
        }
        if(name==='checkTwo'){
            setCheckBoxTwo(checked)
        }

    }

    const btnDisable=!checkBoxOne || !checkBoxTwo ||isSubmitting

    return (
        <div className='m-10 p-0 lg:p-10'>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img src="https://i.ibb.co.com/Yfzt9bj/Rectangle-13.png" alt="Group of friends having fun" className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 flex items-center justify-center bg-white p-6">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
                        <p className="text-gray-600 mb-6">Sign up for free to access to any of our products</p>
                        <SocilLogin></SocilLogin>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="email">Name</label>
                            <input
                                className='w-full border border-gray-300 rounded-lg py-2 px-3 my-3'
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.errors.name ? <div className='text-red-600 font-semibold'>{formik.errors.name}</div> : null}
                            <label htmlFor="email">Photo Url</label>
                            <div className='flex '>
                                <input
                                    className='w-full h-12 border border-gray-300 rounded-lg py-2 px-3 my-3'
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover border my-3" />}
                            </div>
                            <label htmlFor="email">Email Address</label>
                            <input
                                className='w-full border border-gray-300 rounded-lg py-2 px-3 my-3'
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email ? <div className='text-red-600 font-semibold'>{formik.errors.email}</div> : null}
                            <label htmlFor="Password">Password</label>
                            <input
                                className='w-full border border-gray-300 rounded-lg py-2 px-3 my-3'
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.errors.password ? <div className='text-red-600 font-semibold'>{formik.errors.password}</div> : null}
                            <button type="submit" disabled={btnDisable} className={`w-full rounded-lg py-2 mb-4 ${btnDisable ? 'bg-gray-400' : 'bg-purple-600 text-white'}`}>
                                {isSubmitting ? <FaSpinner className="animate-spin mx-auto" /> : 'Sign Up'}
                            </button>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input name='checkOne' onChange={handleCheck} type="checkbox" className="form-checkbox text-purple-600" />
                                    <span className="ml-2 text-gray-700">Agree to our <a href="#" className="text-purple-600">Terms of use</a> and <a href="#" className="text-purple-600">Privacy Policy</a></span>
                                </label>
                            </div>
                            <div className="mb-6">
                                <label className="inline-flex items-center">
                                    <input name='checkTwo' onChange={handleCheck} type="checkbox" className="form-checkbox text-purple-600" />
                                    <span className="ml-2 text-gray-700">Subscribe to our monthly newsletter</span>
                                </label>
                            </div>
                        </form>

                        <p className="text-gray-600 text-center mt-4">Already have an account?<Link to='/login' className="text-purple-600">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;