import React from 'react';

export default function ClientTestamonial() {
    const videoLinks = [
        'https://www.youtube.com/embed/b5VbJ0Xr7FM',
        'https://www.youtube.com/embed/b5VbJ0Xr7FM',
        'https://www.youtube.com/embed/b5VbJ0Xr7FM',
        'https://www.youtube.com/embed/b5VbJ0Xr7FM',
        // Add more video links as needed
    ];

    return (
        <div className="container mx-auto p-4 pt-20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Vlogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoLinks.map((link, index) => (
                    <div key={index} className="video-container">
                        <iframe
                            width="100%"
                            height="315"
                            src={link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`Client Testimonial ${index + 1}`}
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}
