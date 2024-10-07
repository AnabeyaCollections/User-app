import React from 'react';
import WhyChooseUs from './WhyChooseUs'

export default function AboutUs() {
    return (
        <div className="container mx-auto p-8 pt-20">
            <h2 className="text-4xl font-bold text-center mb-14">About Anabeya Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                    <p className="text-gray-700 mb-4 text-xl">
                        At Anabeya Collections, we specialize in creating custom-made women's clothing that perfectly fits your style and preferences. Our mission is to provide high-quality, fashionable clothing that empowers women to express their individuality.
                    </p>
                    <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 text-xl">
                        <li>Custom-made women's clothing</li>
                        <li>Home delivery services</li>
                        <li>Cash on delivery options</li>
                    </ul>
                    <p className="text-gray-700 text-xl">
                        We take pride in our ability to deliver exceptional service and ensure that every piece of clothing is crafted with care and precision. Whether you're looking for everyday wear or something special, Anabeya Collections has you covered.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWxJ0AZIbVxUy5hJXjhfnlVz-kspIyBJXSPA&s/" alt="Anabeya Collections" className="rounded-lg shadow-lg w-64 h-64 md:h-96 md:w-96" />
                </div>
            </div>
           <WhyChooseUs/>
        </div>
    );
}
