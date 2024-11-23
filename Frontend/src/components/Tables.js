import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion } from "framer-motion";
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon, CheckIcon } from '@heroicons/react/24/outline'; // Imported CheckIcon for the tick
import { useDispatch, useSelector } from "react-redux";
import { setTableStatus } from '../store/tableSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTables } from '../store/tableSlice';
import { addCustomer } from '../store/customerSlice';

const bgarr = ["#203688", "#5b45b0", "#8a9dad", "#1d2569", "#EB6440", "#f987c4", "#4C0033", "#434242", "#5b45b0", "#1d2569", "#00a183", "#3C2A21", "#7F167F", "#9C254D", "#735F32", "#285430"];

const Tables = ({ onClick }) => {
    const tables = useSelector(state => state.tables);
    const customer = useSelector(state => state.customer);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null); 
    const [open, setOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
        email: ''
    });
    
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        const fetchTableStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tables');
                const data = await response.json();
                dispatch(setTables(data));
            } catch (error) {
                // Handle error
            }
        };
        fetchTableStatus();
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const allEvents = (id) => {
        const selectedTable = tables.find(table => table.id === id);

        if (selectedTable.status === "Booked") {
            toast.error(`You can't book ${selectedTable.title} as it is already booked.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }

        if (customer.length !== 0) {
            onClick();
        }
        setOpen(true);
        setSelectedId(id);  
    };

    const next = async () => {
        const { name, phone, email } = customerDetails;
    
        if (!name || !phone || !email) {
            toast.error("Please enter all the details.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }

        const phoneRegex = /^[6-9]\d{9}$/; // Validates Indian 10-digit mobile numbers starting with 6-9
        if (!phoneRegex.test(phone)) {
            toast.error("Please enter a valid 10-digit phone number starting with 6-9.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }
    
        const nameRegex = /\d/;
        if (nameRegex.test(name)) {
            toast.error("Name cannot contain numbers!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address with allowed domains.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }
    
        dispatch(setTableStatus({ id: selectedId, status: "Booked" }));

        setOpen(false);
    
        const customerData = { ...customerDetails, tableNum: tables.find(table => table.id === selectedId)?.title };
    
        try {
            const response = await fetch('http://localhost:8000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });
    
            if (response.ok) {
                toast.success("Customer details saved successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
    
                dispatch(addCustomer(customerData));
                onClick();
            } else {
                throw new Error('Failed to save customer details');
            }
        } catch (error) {
            toast.error("Failed to save customer details.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    };
    
    return (
        <div>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 p-3'>
                {tables.map((curr, i) => (
                    <motion.div 
                        key={curr.id} 
                        style={{ backgroundColor: bgarr[i] }} 
                        whileHover={{ backgroundColor: "#1f2544" }} 
                        onClick={() => allEvents(curr.id)} 
                        className='flex justify-between p-3 cursor-pointer text-[#dfe3f4]'
                    >
                        <div className='flex flex-col items-start justify-between pl-4 font-bold h-[135px] space-y-5'>
                            <div>
                                <h3 className='text-2xl'>{curr.title}</h3>
                            </div>
                            <div className='flex flex-row items-center space-x-2'>
                                <p className='text-xs font-normal'>Status</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                                <p className='text-xs font-bold'>{curr.status}</p>
                            </div>
                            {curr.status === 'Booked' && (
                                <CheckIcon className="w-8 h-8 text-green-500" /> // Displaying the tick icon when the table is booked
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
    <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
            <UserIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
        </div>
    </div>
    <div>
        <div className="text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Customer Details
            </Dialog.Title>
            <div className="mt-2">
                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="border border-gray-200 outline-none px-5 py-2 text-sm w-full"
                    />
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="border border-gray-200 outline-none px-5 py-2 text-sm w-full"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={customerDetails.email}
                        onChange={handleInputChange}
                        className="border border-gray-200 outline-none px-5 py-2 text-sm w-full"
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="mt-6 sm:mt-5 sm:flex sm:flex-row-reverse">
        <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            onClick={next}
        >
            Save
        </button>
    </div>
</Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer />
        </div>
    );
};

export default Tables;