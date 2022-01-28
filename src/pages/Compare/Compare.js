import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Compare = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    const search = user?.email;

    useEffect(() => {
        fetch(`https://secure-inlet-47407.herokuapp.com/my-orders?search=${search}`)
            .then(res => res.json())
            .then(result => setOrders(result))
    }, [search])

    const onSubmitDelete = id => {
        const proceed = window.confirm('Are you sure, you want to DELETE?')
        if (proceed) {
            fetch(`https://secure-inlet-47407.herokuapp.com/all-orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount > 0) {
                        alert("Deleted successfully");
                        const remainingOrders = orders.filter(order => order._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    };

    return (
        <>
            <Header />
            <div className="md:h-screen">
                <p>Add blog to compare from <Link className='text-blue-700 decoration-wavy' to='/'>home</Link> page</p>
                <h1 className="text-yellow-500 font-bold text-2xl py-4">Compare Blogs</h1>
                <table className="table-auto w-9/12 mx-auto border mb-4">
                    <thead>
                        <tr>
                            <th className="border-2 border-red-100">Sr. No.</th>
                            <th className="border-2 border-red-100">Name and Email</th>
                            <th className="border-2 border-red-100">Place</th>
                            <th className="border-2 border-red-100">Title</th>
                            <th className="border-2 border-red-100">Check In Date</th>
                            <th className="border-2 border-red-100">Status</th>
                            <th className="border-2 border-red-100">Action</th>
                        </tr>
                    </thead>
                    {orders.map((order, i) => <tbody key={i}>
                        <tr>
                            <td className="border-2 border-red-100">{i + 1}</td>
                            <td className="border-2 border-red-100">
                                <p>{order?.name}</p>
                                <p>{order?.email}</p>
                            </td>
                            <td className="border-2 border-red-100 w-1/12 h-1/12">
                                <img className="rounded-lg" src={order?.img_url} alt="" />
                            </td>
                            <td className="border-2 border-red-100">{order?.title}</td>
                            <td className="border-2 border-red-100">{order?.checkInDate}</td>
                            <td className="border-2 border-red-100">{order?.status}</td>
                            <td className="border-2 border-red-100">
                                <button onClick={() => onSubmitDelete(order?._id)}>
                                    <div className="flex text-red-500 bg-red-100 px-2 py-0.5 rounded-lg">
                                        Delete
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>)}
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Compare;