import React, { useState, useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { X } from 'lucide-react';

const host = 'https://anabeya-backend.onrender.com';

export default function FeaturedProducts(props) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${host}/products/getproducts`);
                const allProducts = await response.json();

                // Shuffle the products array
                const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());

                // Get a subset of 3 products
                const limitedProducts = shuffledProducts.slice(0, 4);

                setProducts(limitedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
        props.showAlert(`${product.name} Added to cart`,'success')
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className='center text-center text-3xl py-4 font-bold'>Featured Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center p-4">
                            <img onClick={() => openModal(product)} src={product.image} alt={product.name} className="w-56 h-56 object-cover rounded-lg" />
                            <div className="p-4">
                                <h3 className="text-lg text-center font-semibold">{product.name}</h3>
                                <p className="text-gray-600 text-center">RS {product.price}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                   <FaShoppingBag/>
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
                        <img  src={selectedProduct.image} alt={selectedProduct.name} className="w-72 h-72 object-cover my-4 rounded-xl" />
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
