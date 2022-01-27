import { CurrencyDollarIcon, ExclamationIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [productRemoved, setProductRemoved] = useState(false);

    useEffect(() => {
        fetch('https://quiet-fjord-11684.herokuapp.com/explore')
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);
    const handleProductDelete = id => {
        if (window.confirm('Do you want to Delete this Product?')) {
            fetch(`https://quiet-fjord-11684.herokuapp.com/product/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingProducts = products.filter(product => product._id !== id);
                        setProducts(remainingProducts);
                        setProductRemoved(!productRemoved);
                    }
                })
        }

    };
    return (
        <div>
            <h1 className="text-indigo-600 font-bold text-3xl">Manage your Product</h1>
            {
                productRemoved && <span className="bg-red-50 text-red-500 rounded-md flex justify-between tracking-wider p-1"><span className="flex"><ExclamationIcon className="h-6 w-6 mr-2" aria-hidden="true" />Product Deleted</span><XIcon onClick={() => setProductRemoved(!productRemoved)} className="h-6 w-6" aria-hidden="true" /></span>
            }
            <div className="grid grid-cols-3 w-10/12 mx-auto gap-8 my-8">
                {
                    products.map(product => <div
                        className="flex"
                        key={product._id}
                    >
                        <div className="flex flex-col justify-between p-4 border-2 rounded-lg hover:shadow-md">
                            <div>
                                <img className="rounded-lg" src={product?.img_url} alt="" />
                                <div className="flex flex-col justify-between space-y-6 my-4">
                                    <h3 className="text-xl font-semibold text-indigo-600">{product?.productName}</h3>
                                    <p>{product?.productInformation}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="flex bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg">Price : {product?.price}&nbsp;
                                    <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />
                                </p>
                                <button onClick={() => handleProductDelete(product?._id)} className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">Delete</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageProducts;