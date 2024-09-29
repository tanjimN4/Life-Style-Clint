import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SocilLogin from './SocilLogin';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}

const Login = () => {

    const { signIn } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            const email = values.email
            const password = values.password
            console.log(email, password);

            signIn(email, password)
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Success.',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });

                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Okay',
                    });

                })

        },

    })
    return (
        <div className='m-10 p-0 lg:p-10'>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 w-full">
                    <img src="https://i.ibb.co.com/r5CN4Bq/bert-b-rh-Nff6h-B41s-unsplash-1.png" alt="Three women wearing sunglasses and smiling" className="w-full h-full object-cover object-top" />
                </div>
                <div className="md:w-1/2 w-full flex items-center justify-center p-4">
                    <div className="w-full md:w-3/4">
                        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Sign In Page</h1>
                        <SocilLogin></SocilLogin>
                        <form onSubmit={formik.handleSubmit}>
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

                            <button type="submit" className="w-full bg-purple-600 text-white rounded-lg py-2 mb-4">Sign In</button>
                        </form>
                        <div className="text-center">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link to='/register' className="text-purple-600">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;