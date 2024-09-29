import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const CategoryDetails = ({ categoryDetails }) => {
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();

    const increment = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 0) + 1
        }));
    };

    const decrement = (id) => {
        setQuantities(prevQuantities => {
            if ((prevQuantities[id] || 0) > 0) {
                return {
                    ...prevQuantities,
                    [id]: (prevQuantities[id] || 0) - 1
                };
            }
            return prevQuantities;
        });
    };

    const addItems = (data) => {
        const { id, title, price, category } = data;
        const quantity = quantities[id] || 0;
        const newData = { id, title, price: price * quantity, category, quantity };
        
        if (quantity > 0) {
            dispatch(add(newData));
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [id]: 0
            }));
        }
    };

    return (
        <div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-1'>
                {categoryDetails?.map((curr, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        whileHover={{ backgroundColor: "#1f2544" }}
                        style={{ backgroundColor: "#151a34", color: "#dfe3f4" }}
                        className='flex justify-between p-3 h-[150px] cursor-pointer'
                    >
                        <div onClick={() => addItems(curr)} className='flex flex-col items-start justify-between pl-4 font-bold h-[95px] space-y-5'>
                            <div>
                                <h3>{curr.title}</h3>
                                <p className='text-xs text-[#818497]'>₹{curr.price}</p>
                            </div>
                            <div className='flex flex-row items-center space-x-2'>
                                <p className='text-xs font-normal'>Orders</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                                <p className='text-xs font-normal text-[#474c54]'>Kitchen</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                            <svg
                                onClick={() => increment(curr.id)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="cursor-pointer w-6 h-6 bg-[#0e1227] rounded-sm p-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className='font-semibold text-2xl'>{quantities[curr.id] || "0"}</p>
                            <svg
                                onClick={() => decrement(curr.id)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="cursor-pointer w-6 h-6 bg-[#0e1227] rounded-sm p-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </div>
                        {curr.img && (
                            <div className='ml-2'>
                                <img src={curr.img} alt={curr.title} className='h-28 w-28 object-cover rounded' />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default CategoryDetails;
