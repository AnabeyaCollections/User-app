import React, { useEffect, useState } from 'react';
import FeaturedProducts from './FeaturedProducts';

const host = 'https://anabeya-backend.onrender.com';

export default function Orders(props) {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${host}/orders/fetchorders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-Token': `${localStorage.getItem('token')}`,
                    }
                });
                const ordersData = await response.json();
                const reverseData = ordersData.slice().reverse();
                setOrders(reverseData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="py-6 container mx-auto pt-20 px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Orders</h2>
            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="bg-gray-100 shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Status: {order.status}</p>
                            <p className="text-gray-600">Price: {order.price}</p>
                            <p className="text-gray-600">Size: {order.size}</p>
                            
                            <h4 className="mt-4 font-semibold">Products:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                {order.Products.map((product) => (
                                    <div key={product.product} className="bg-white p-4 rounded-lg flex flex-col items-center">
                                        <img src={product.image} alt={product.productName} className="h-48 w-48 object-cover mb-2 rounded-lg" />
                                        <p className="font-semibold">{product.productName}</p>
                                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No orders placed yet.</p>
                )}
            </div>
            <FeaturedProducts updateCart={props.updateCart} showAlert={props.showAlert}/>
        </div>
    );
}
