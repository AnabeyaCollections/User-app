import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {FaShoppingBag } from 'react-icons/fa';
const host = 'https://anabeya-backend.onrender.com';

export default function AllProducts(props) {
    

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        props.updateCart(cart.length);

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${host}/products/getproducts`);
                const products = await response.json();
                if (products.length > 0) {
                    setProducts(products.slice().reverse());
                    setFilteredProducts(products); // Initialize filtered products
                    // Extract unique categories
                    const uniqueCategories = ['All', ...new Set(products.map(product => product.catagory))];
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [props]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.catagory === selectedCategory);
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, products]);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item._id === product._id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        props.updateCart(cart.length);
        props.showAlert(`${product.name} added to cart`,'success')
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <div className="container mx-auto p-4 pt-20 pb-10">
                <h1 className='text-center text-3xl py-4 font-bold'>All Products</h1>
                
                {/* Category Dropdown */}
                <div className="mb-4">
                    <label htmlFor="catagory" className="block text-lg font-semibold">Filter by Category:</label>
                    <select
                        id="catagory"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-2 p-2 px-4 border rounded"
                    >
                        {categories.map((catagory, index) => (
                            <option key={index} value={catagory}>{catagory}</option>
                        ))}s
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center p-4">
                            <img src={product.image} alt={product.name} className="w-56 h-56 object-cover rounded-lg" onClick={() => openModal(product)} />
                            <div className="p-4">
                                <h3 className="text-lg text-center font-semibold">{product.name}</h3>
                                <p className="text-gray-600 text-center">RS {product.price}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent modal from opening
                                        addToCart(product);
                                    }}
                                    className="mt-4 bg-black text-white text-center py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    <FaShoppingBag />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full p-6 relative flex flex-col justify-center items-center">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 ">
                            <X size={24}/> 
                        </button>
                        <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-72 h-72 object-cover my-4 rounded-xl" />
                        <p className="text-gray-600">{selectedProduct.description || 'No description available'}</p>
                        <p className="text-xl font-semibold mt-2">RS {selectedProduct.price}</p>
                        <button
                            onClick={() => {
                                addToCart(selectedProduct);
                                closeModal();
                            }}
                            className="mt-4  bg-black text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            <FaShoppingBag size={24}/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
