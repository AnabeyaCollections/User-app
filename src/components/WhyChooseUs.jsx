import React from 'react';
import { FaTruck, FaTshirt, FaDollarSign } from 'react-icons/fa';

export default function WhyChooseUs() {
    const features = [
        {
            icon: <FaTruck size={40} />,
            title: 'Home Delivery',
            description: 'Convenient home delivery service to get your orders right at your doorstep.',
            bgColor: 'bg-blue-100',
        },
        {
            icon: <FaTshirt size={40} />,
            title: 'Custom Orders',
            description: 'Tailor-made clothing to fit your unique style and preferences.',
            bgColor: 'bg-green-100',
        },
        {
            icon: <FaDollarSign size={40} />,
            title: 'Competitive Prices',
            description: 'High-quality fashion at prices that won’t break the bank.',
            bgColor: 'bg-yellow-100',
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-semibold text-center mb-8">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className={`p-6 px-2 rounded-lg shadow-lg ${feature.bgColor}`}>
                        <div className="flex justify-center mb-4">
                            {feature.icon}
                        </div>
                        <h4 className="text-xl font-bold text-center mb-2">{feature.title}</h4>
                        <p className="text-gray-700 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
