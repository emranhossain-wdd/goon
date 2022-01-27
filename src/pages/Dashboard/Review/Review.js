import { StarIcon, XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import useAuth from '../../../Hooks/useAuth';

const Review = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [reviewAdded, setReviewAdded] = useState(false);

    const onSubmit = data => {
        data.displayName = user.displayName;
        data.email = user.email;
        data.rating = rating;
        fetch('https://quiet-fjord-11684.herokuapp.com/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setReviewAdded(!reviewAdded);
                    reset();
                }
            })
    };

    return (
        <div>
            <h1 className="text-3xl text-indigo-600 font-bold">Rate and Review</h1>
            <p>Your review will be posted publicly on the web.</p>
            {
                reviewAdded && <span className="bg-indigo-50 text-indigo-500 rounded-md flex justify-between tracking-wider p-1">Thanks for your feedback !<XIcon onClick={() => setReviewAdded(!reviewAdded)} className="h-6 w-6" aria-hidden="true" /></span>
            }
            <div className="flex items-start justify-center space-x-4 mt-12 mb-4 text-indigo-600">
                <span>Please rate us!</span>
                <Rating
                    emptySymbol={<StarIcon className="h-6 w-6 mr-2" aria-hidden="true" />}
                    fullSymbol={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>}
                    onClick={(rate) => setRating(rate)}
                />
            </div>
            <form className="grid space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="ring-2 ring-indigo-600 rounded-md p-2"
                    type="text"
                    {...register("reviewHeading", { required: true })}
                    placeholder="What do you think about this place."
                />
                {
                    errors.reviewHeading && <span className="bg-indigo-50 text-indigo-500 rounded-md">This field is required</span>
                }
                <textarea
                    className="ring-2 ring-indigo-600 rounded-md p-2 h-32"
                    type="text"
                    {...register("review", { required: true })}
                    placeholder="Share details of your own experience at this place."
                />
                {
                    errors.review && <span className="bg-indigo-50 text-indigo-500 rounded-md">This field is required</span>
                }

                <input className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md p-2" type="submit" value="Post" />
            </form>
        </div>
    );
};

export default Review;