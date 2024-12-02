import React, { useState } from 'react';
import menu from "../json/menu.json"

const Sidebar = () => {
    const [selected, setSelected]= useState(0)
  return (
    <div className='bg-[#fff] shad h-[calc(94vh)] rounded-xl my-8 ms-4 w-[280px]  shadow-custom'>
        <div className='mb-4 mt-4 p-4'>
            <p className='text-[#4E58FF] font-semibold'>Batkhuu Battulga</p>
            <p className='text-[#4E58FF] text-sm'>Багш</p>
        </div>
     {menu.map((items)=>{
       return(
        <div onClick={()=>{setSelected(items.id)}} key={items.id} className={` hover:bg-[#B8C0FF] flex items-center gap-1 ps-4 py-2 ${selected === items.id ? "border-r-4 border-[#4E58FF]":""}`}>
           {selected === items.id ?  <img className='w-[18px] h-[18px]' src={items.selectedImg} alt="img" />: <img className='w-[18px] h-[18px]' src={items.img} alt="img" />}
           <p className={`text-[#4E58FF] ${selected === items.id ? "font-semibold ":""}`}> {items.name}</p></div>
       )
     })}
    </div>
  );
};

export default Sidebar;
