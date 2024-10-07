import { Trash, } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus} from 'react-icons/fa';
import FeaturedProducts from './FeaturedProducts';
import { useNavigate } from 'react-router-dom';

const host = 'https://anabeya-backend.onrender.com';

export default function Cart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('')
    const [size, setSize] = useState('')
    let navigate = useNavigate();

    useEffect(() => {
        const Items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(Items);
        props.updateCart(Items.length);
    }, [localStorage.getItem('cart')]);

    const updateCartInLocalStorage = (updatedItems) => {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        props.updateCart(updatedItems.length);
    };

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
    };

    const decreaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                const newQuantity = (item.quantity || 1) - 1;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
    };

    const removeItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        props.showAlert(`Product deleted from the cart`,'success')
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    };

    const placeOrder = async () => {
        if (!name || !phone || !location) {
            alert('Please fill in all fields');
            return;
        }
        if(!localStorage.getItem('token')){
            props.showAlert('Please Login or Signup to place order','warning')
            navigate('/login')
            return;
        }
        const TotalPrice = calculateTotalPrice();
        console.log('TotalPrice:', TotalPrice); // Log TotalPrice

        const order = {
            products: cartItems.map((item) => ({
                productId: item._id,
                quantity: item.quantity || 1,
                image: item.image,
                productName: item.name,
            })),
            name,
            phone,
            location,
            size,
            price: `${TotalPrice}` 
        };
        try {
            const response = await fetch(`${host}/orders/addorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-Token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(order) // Send the order object as JSON
            });

            const data = await response.json();
            props.showAlert(`Order Placed successfully`,'success');
            localStorage.removeItem('cart')
            setCartItems([]);
            setShowForm(false);
            setName('');
            setPhone('');
            setLocation('');
            setSize('');
            props.updateCart(0)
            navigate('/orders')
        } catch (error) {
            console.error('Error placing order:', error);
            props.showAlert('Error placing order please try again later','error')
        }
    };
    return (
        <>
            <div className="container pt-20 mx-auto px-10">
                <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
               {cartItems.length > 0?(<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden flex items-center justify-center flex-col p-4">
                            <img src={item.image} alt={item.name} className="w-64 h-64 object-cover rounded-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">RS {item.price}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="mx-5 text-black text-lg">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="mx-4 text-red-600 text-xl"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>):(<h1 className='text-2xl '>No Items Added Yet</h1>)
                }

                {cartItems.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Total Price: RS {calculateTotalPrice()}</h3>
                        <button
                            onClick={() => setShowForm(true)}
                            type="button"
                            className="mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Check Out
                        </button>
                    </div>
                )}

                {showForm && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Place Order</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label className="block mb-2">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Size:
                                <input
                                    type="text"
                                    name="size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </label>
                            <button
                                onClick={placeOrder}
                                type="button"
                                className="mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <FeaturedProducts updateCart={props.updateCart} showAlert={props.showAlert} />
        </>
    );
}
