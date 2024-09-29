import React from 'react';
import { FaGooglePlay } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">Need Help</h3>
                            <ul>
                                <li className="mb-2"><a href="#">Contact Us</a></li>
                                <li className="mb-2"><a href="#">Track Order</a></li>
                                <li className="mb-2"><a href="#">Returns & Refunds</a></li>
                                <li className="mb-2"><a href="#">FAQ's</a></li>
                                <li className="mb-2"><a href="#">Career</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Company</h3>
                            <ul>
                                <li className="mb-2"><a href="#">About Us</a></li>
                                <li className="mb-2"><a href="#">euphoria Blog</a></li>
                                <li className="mb-2"><a href="#">euphoriastan</a></li>
                                <li className="mb-2"><a href="#">Collaboration</a></li>
                                <li className="mb-2"><a href="#">Media</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">More Info</h3>
                            <ul>
                                <li className="mb-2"><a href="#">Term and Conditions</a></li>
                                <li className="mb-2"><a href="#">Privacy Policy</a></li>
                                <li className="mb-2"><a href="#">Shipping Policy</a></li>
                                <li className="mb-2"><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Location</h3>
                            <p className="mb-2">support@euphoria.in</p>
                            <p className="mb-2">Eklingpura Chouraha, Ahmedabad Main Road</p>
                            <p className="mb-2">(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8 space-x-4">
                        <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p>Copyright © 2023 LifeStyle Pvt Ltd. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;