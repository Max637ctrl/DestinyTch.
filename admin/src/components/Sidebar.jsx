import React from 'react'
import {NavLink} from 'react-router-dom'
import {BsCardChecklist, BsCardList, BsPlusSquare} from 'react-icons/bs'
import {BsPerson} from 'react-icons/bs';
import { BsCalculator } from 'react-icons/bs';
import { FaBoxesStacked } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <div className='w-1/5 min-h-screen border-r border/slate-900/10'>
      <div className='flex flex-col gap-10 pt-4 sm:pt-10 pl-[20%]'>
      <NavLink 
    to={'/add'} 
    className={({ isActive }) => 
        `flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 ${isActive ? 'bg-slate-100' : '!bg-transparent'}`}
>
    <BsPlusSquare />
    <p className='hidden lg:flex'>Add Items</p>
</NavLink>

<NavLink 
    to={'/list'} 
    className={({ isActive }) => 
        `flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 ${isActive ? 'bg-slate-100' : '!bg-transparent'}`}
>
    <BsCardList />
    <p className='hidden lg:flex'>List products</p>
</NavLink>

<NavLink 
    to={'/orders'} 
    className={({ isActive }) => 
        `flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 ${isActive ? 'bg-slate-100' : '!bg-transparent'}`}
>
    <BsCardChecklist />
    <p className='hidden lg:flex'>Orders</p>
</NavLink>


<NavLink 
    to={'/calc'} 
    className={({ isActive }) => 
        `flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 ${isActive ? 'bg-slate-100' : '!bg-transparent'}`}
>
    <BsCalculator />
    <p className='hidden lg:flex'>Calculator</p>
</NavLink>
      </div>
    </div>
  );
};

export default Sidebar
