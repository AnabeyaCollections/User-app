import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const host = 'https://anabeya-backend.onrender.com'
const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${host}/reviews/fetch`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = { name, rating, comment };
        if(!localStorage.getItem('token')){
            navigate('/login')
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/reviews/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });

            const savedReview = await response.json();
            setReviews([...reviews, savedReview]);
            setName('');
            setRating(1);
            setComment('');
            props.showAlert('Review successfully placed','success');
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const renderStars = (selectedRating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                color={index < selectedRating ? '#ffc107' : '#e4e5e9'}
                onClick={() => setRating(index + 1)} // Set rating on star click
                className="cursor-pointer"
            />
        ));
    };

    return (
        <div className="container mx-auto p-4 pt-24">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded mb-2 w-full"
                />
                <div className="flex mb-2">
                    {renderStars(rating)} {/* Render clickable stars */}
                </div>
                <textarea
                    placeholder="Your Review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="border p-2 rounded mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>

            <div>
                {reviews.map((review, index) => (
                    <div key={index} className="border-b mb-4 pb-2">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex">
                            {renderStars(review.rating)} {/* Display stars for each review */}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
                        </div>
        </div>
    );
};

export default Reviews;

