import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const RightDivTop = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility

    const logout = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("jwt");
        navigate("/"); // Navigate to home or login page
    };

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format, and handle midnight as 12
    const currentTime = `${hours}:${minutes} ${ampm}`;

    // Extract the first name from the user's full name
    const firstName = user?.name?.split(' ')[0] || 'User';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    return (
        <div>
            <div className='flex justify-between items-center bg-[#060c18] text-white px-4 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    {/* Icon (Optional) */}
                </svg>
                <div className='flex items-center space-x-2'>
                    <div>
                        <p className='text-right font-semibold'>{firstName}</p> {/* Display user's first name */}
                        <p style={{ fontSize: "10px" }} className='text-[#ffffff]'>Clocked in {currentTime}</p>
                    </div>
                    <div className='relative'>
                        <Avatar className='cursor-pointer' onClick={toggleDropdown} name={user.name} size='30' round='50px' />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48">
                                <ul>
                                    
                                    <li 
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={logout} // Logout functionality
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightDivTop;
