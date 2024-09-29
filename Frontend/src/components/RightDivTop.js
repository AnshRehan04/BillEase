import React from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const RightDivTop = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("jwt");
        navigate("/");
    };

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format, and handle midnight as 12
    const currentTime = `${hours}:${minutes} ${ampm}`;

    // Extract the first name from the user's full name
    const firstName = user?.name?.split(' ')[0] || 'User';

    return (
        <div>
            <div className='flex justify-between items-center bg-[#060c18] text-white px-4 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    
                </svg>
                <div className='flex items-center space-x-2'>
                    <div>
                        <p className='text-right font-semibold'>{firstName}</p> {/* Display user's first name */}
                        <p style={{ fontSize: "10px" }} className='text-[#ffffff]'>Clocked in {currentTime}</p>
                    </div>
                    <Avatar className='cursor-pointer' onClick={logout} name={user.name} size='30' round='50px' />
                </div>
            </div>
        </div>
    );
};

export default RightDivTop;
