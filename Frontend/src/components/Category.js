import React, { useState } from 'react'
import CategoryDetails from './CategoryDetails'
import PlacedOrder from './PlacedOrder'
import { motion } from "framer-motion"
import menus from "../api/api";
import { getItems } from './logics/getItems';

const categories = [
    {
        id: 0,
        title: "Starter (Veg)",
        bg: "#B73E3E",
        category: "Starter1",
        leftradis : "9px",
        img:"https://i.postimg.cc/fbqMyMm8/image-266837-1671811524.png"
    },
    {
        id: 1,
        title: "Starter (Non-Veg)",
        bg: "#5b45b0",
        category: "Starter2",
        img:"https://i.postimg.cc/FH1Wk4N4/637945968919611327.webp"
    },
    {
        id: 2,
        title: "Main Course",
        bg: "#7F167F",
        category: "mainCourse",
        img:"https://i.postimg.cc/3wGHppYY/depositphotos-98232150-stock-photo-pan-fried-salmon-with-tender.webp"
    },
    {
        id: 3,
        title: "Pizza",
        bg: "#1d2569",
        category: "Pizza",
        rightradis : "9px",
        img:"https://i.postimg.cc/R04TQxzh/images.jpg"
    },
    {
        id: 4,
        title: "Dessert",
        bg: "#3a56bd",
        category: "Dessert",
        bottomleftradis : "9px",
        img:"https://i.postimg.cc/Y9fwmcYt/easy-chocolate-molten-cakes-37a25eb.jpg"
    },
    {
        id: 5,
        title: "Beverage",
        bg: "#735F32",
        category: "Beverage",
        img:"https://i.postimg.cc/s2mcBwxt/images.jpg"
    },
    {
        id: 6,
        title: "Soups",
        bg: "#9C254D",
        category: "Soups",
        img:"https://i.postimg.cc/X7n95wSW-/istockphoto-1092632852-612x612.jpg"
    },
    {
        id: 7,
        title: "Rum",
        bg: "#285430",
        category: "Rum",
        bottomrightradis : "9px",
        img:"https://i.postimg.cc/cH9GcR9z/Mcdowells-No-1-Celebration-Rum.jpg"
    },
]

const Category = () => {
    const [categoryDetails, setCategoryDetails] = useState();
    const [selected, setSelected] = useState(false);
    const [id, setId] = useState();

    const getCategoryDetails = (category) => {
        const newArr = menus.filter(a => a.category === category);
        setCategoryDetails(newArr);
    }

    const allEvets = (category, id) => {
        getCategoryDetails(category);
        setId(id)
    }

    return (
        <>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} style={{
                backgroundColor: "#0e1227"
            }} className='p-4 border-b-2 border-black h-[340px] overflow-y-scroll scrollbar-hide'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2'>
                    {
                        categories.map((curr, i) => {
                            return (
                                <div onClick={() => allEvets(curr.category, curr.id)} key={i} style={{
                                    backgroundColor: `${curr.bg}`,
                                    borderTopLeftRadius : `${curr.leftradis}`,
                                    borderTopRightRadius : `${curr.rightradis}`,
                                    borderBottomLeftRadius : `${curr.bottomleftradis}`,
                                    borderBottomRightRadius : `${curr.bottomrightradis}`,
                                    color: "#dfe3f4"
                                }} className='flex items-center justify-between cursor-pointer p-4'>
                                    <div className='flex flex-col items-start justify-between mr-4'>
                                        <h3 className='font-bold'>{curr.title}</h3>
                                        <small className='text-white font-semibold'>{getItems(curr.category, menus)} items</small>
                                    </div>
                                    {curr.img && (
                                        <img src={curr.img} alt={curr.title} className='w-[80px] h-[80px] object-cover rounded-md' />
                                    )}
                                    {id == curr.id && (
                                        <div className='pr-2 bg-black opacity-40 h-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mt-8 font-bold ml-1 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
            </motion.div>
            <div className='p-4 h-[334px] border-b border-black' style={{
                backgroundColor: "#0e1227"
            }}>
                {categoryDetails?.length > 0 ? <CategoryDetails categoryDetails={categoryDetails} /> : (<small className='text-[#818497]'>Select any category. </small>)}
            </div>
        </>
    )
}

export default Category
