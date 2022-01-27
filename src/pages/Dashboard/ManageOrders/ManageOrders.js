import { BadgeCheckIcon, CheckIcon, CurrencyDollarIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [productRemoved, setProductRemoved] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(false);

    useEffect(() => {
        fetch('https://quiet-fjord-11684.herokuapp.com/order')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [statusUpdate])

    const handleOrderCancel = id => {
        if (window.confirm('Do you want to cancel this order?')) {
            fetch(`https://quiet-fjord-11684.herokuapp.com/order/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingOrders = orders.filter(order => order._id !== id);
                        setOrders(remainingOrders);
                        setProductRemoved(!productRemoved);
                    }
                })
        }

    };

    const updateStatus = id => {
        const data = { status: "Delivered" };
        fetch(`https://quiet-fjord-11684.herokuapp.com/status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setStatusUpdate(!statusUpdate);
                    // window.location.reload();
                }
            })
    }

    return (
        <div>
            <h1 className="text-indigo-600 text-3xl font-bold">Manage orders</h1>
            {
                productRemoved && <span className="bg-red-50 text-red-500 rounded-md flex justify-between tracking-wider p-1"><span className="flex"><ExclamationIcon className="h-6 w-6 mr-2" aria-hidden="true" />Order canceled</span><XIcon onClick={() => setProductRemoved(!productRemoved)} className="h-6 w-6" aria-hidden="true" /></span>
            }
            {
                statusUpdate && <span className="bg-green-100 text-green-600 rounded-md flex justify-between tracking-wider p-1"><span className="flex"><CheckIcon className="h-6 w-6 mr-2" aria-hidden="true" />Updated !</span><XIcon onClick={() => setProductRemoved(!productRemoved)} className="h-6 w-6" aria-hidden="true" /></span>
            }
            <div className="grid grid-cols-3 w-10/12 mx-auto gap-8 my-6">
                {
                    orders.map(order => <div key={order._id}
                        className="border-2 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <img className="w-4/12 rounded-full" src={order?.img_url} alt="" />
                            {
                                order?.status === 'pending' ?
                                    <div className="flex items-center"><p className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">{order?.status}</p>&nbsp;
                                        <BadgeCheckIcon onClick={() => updateStatus(order?._id)} className="h-6 w-6 text-green-500" aria-hidden="true" /></div>
                                    :
                                    <p className="bg-green-100 text-green-500 py-2 px-4 rounded-lg">{order?.status}</p>
                            }
                        </div>
                        <div className="text-left my-6">
                            <h3 className="text-indigo-600 font-bold text-xl">{order?.productName}</h3>
                            <p className="flex">Price : {order?.price}&nbsp;
                                <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />
                            </p>
                            {
                                order?.status === 'pending' &&
                                <button onClick={() => handleOrderCancel(order?._id)} className="bg-red-100 text-red-500 py-2 px-4 rounded-lg mt-6">Cancel</button>
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageOrders;