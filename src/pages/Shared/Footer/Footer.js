import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-10/12 mx-auto">
            <div className="flex py-4">
                <div className="text-left space-y-4">
                    <h1 className="font-bold text-indigo-600 text-5xl">Burford Woodcraft</h1>
                    <p className="font-semibold text-gray-500 w-7/12">Burford Woodcraft specialises in wood. It has successfully promoted contemporary British craftsmanship for over forty years. Pieces are chosen carefully for their good design and a high quality finish. Also for originality and value for money.</p>
                </div>
                <div className="w-3/12 text-right text-indigo-600">
                    <h3 className="text-2xl font-bold mb-4">Useful links</h3>
                    <div className="grid">
                        <Link to="/">Home</Link>
                        <Link to="/explore">Explore</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className="border-t-2 border-indigo-100 font-semibold text-gray-500 py-2">
                &copy; <span className="text-indigo-600">Burford Woodcraft</span> .All rights reserve
            </div>
        </div>
    );
};

export default Footer;