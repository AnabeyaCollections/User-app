import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {

    return (
        <>
            <div className={`relative bg-cover m-auto bg-center h-screen`} style={{ backgroundImage: "url('https://img.freepik.com/free-photo/collection-dresses-store_188544-25541.jpg')", }}>

                <div className="text center absolute inset-0 bg-black opacity-30"></div>
                
                <div className="relative text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">

                    <h1 className={`text-white mt-6 text text-3xl sm:text-3xl md:text-5xl font-bold `} style={{ textShadow: '2px 2px 3px black' }}>
                        Welcome to Anabeya Collections
                    </h1>

                    <h3 className="text-white mt-6 text-xl sm:text-4xl md:text-4xl font-bold leading-tight">
                        Discover your Unique Style
                    </h3>

                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white">
                        At Anabeya Collections, we offer a curated selection of fashion-forward garments and accessories. Plus, we provide custom orders to ensure you get the perfect fit and style for any occasion. Explore our collection today!
                    </p>

                    <div className="mt-16 flex justify-center">
                        <Link to="/allproducts">
                            <button type="button" class="text-white bg-black transition duration-700 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-white-800">
                                <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                Shop now
                            </button>
                        </Link>
                    </div>

                </div>
            </div>

        </>
    );
}
