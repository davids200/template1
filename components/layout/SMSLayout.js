import Link from 'next/link'
import { useState,Fragment } from "react";
import { getSession } from "next-auth/react"
import { HiOutlineLogout, HiOutlineUserCircle, HiUserAdd } from "react-icons/hi";
import { ArrowRightIcon } from "@heroicons/react/solid"; 
import { Menu, Transition, Popover } from "@headlessui/react";
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/userSlice'
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { toastError } from '../../redux/slices/toastSlice';
import {
  Bars3Icon,
  UserIcon ,
  HomeIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import {   
HiUserGroup, 
HiArchive,
HiClock, 
HiChat,
HiCreditCard,
HiPlusCircle,
} from "react-icons/hi";

import { useRouter } from "next/router";  
import { textEllipsis } from '../../lib/truncatedText'


const SMSLayout = ({ children,session }) => {
const   { isAuthenticated,user } = useSelector(state => state.user);
const defaultPhoto="/assets/user.png"
const router = useRouter();
const dispatch = useDispatch()
const [isMenuOpen, setIsMenuOpen] = useState(false)


if(!isAuthenticated){ 
router.push('/user/login')  
dispatch(toastError({type: 'toast/toastError',message:"Login required!!"}))  
}  


if(isAuthenticated){  

const handleMenuToggle = () => {
setIsMenuOpen(!isMenuOpen)
}

async function  handleSignout(){
try{
await signOut()
dispatch(logOut("SIGN_OUT"))
router.push('/user/login')
}catch(Err){

}
  
}

let amount=9000
const formattedAmount = amount.toLocaleString(undefined, {
  style: 'currency',
  currency: 'UGX',
});
 
const company="ICT Giants"

  return (
  <div className="flex flex-col absolute h-full w-screen">
  <header className="flex items-center justify-between bg-blue-900 px-2">
  <div className="text-white font-bold text-xl flex flex items-center mr-0">

  <picture >
  <img src={user?.photo_url || defaultPhoto} width={60} height={62} alt={user?.name} className=' rounded-sm ' />
  </picture> 
   <div className='flex pl-5'>{textEllipsis(company,10)}</div> 
  </div>
  
 <div className='flex flex-1 justify-end text-right text-white pr-2'> 
 <span className='p-1 rounded-lg text-white bg-red-700 text-bold'>Credits:&nbsp;{formattedAmount}</span>
  </div>
   
  
  
<nav className="hidden md:flex px-4 text-right">
<Menu as="div" className="relative inline-block">
          <div className=''>
            <Menu.Button className="inline-flex w-full justify-center items-center">
  
<span className="mx-1 hidden md:block font-medium text-white">
{user?.email}  
</span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
            </Menu.Button>
          </div>


          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
<Menu.Items className="absolute right-0 bg-blue-100 w-56 z-50 mt-2 origin-top-right rounded shadow-sm">
<div className="p-1">
<Menu.Item>
<Link
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<PencilIcon className="h-4 w-4 mr-2" />
Edit
</Link>
</Menu.Item>
<Menu.Item>
<Link
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<CreditCardIcon className="h-4 w-4 mr-2" />
Billing
</Link>
</Menu.Item>

<Menu.Item>
<Link
href="profile/"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiOutlineUserCircle className="h-4 w-4 mr-2" />
My Account
</Link>
</Menu.Item>

<Menu.Item>
<Link onClick={handleSignout}
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiOutlineLogout className="h-4 w-4 mr-2" />
SignOut
</Link>
</Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
 
        </nav>



        <button
          className="md:hidden text-white focus:outline-none"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </header>



<div className="flex flex-1">
<aside
className={`${
isMenuOpen ? 'block' : 'hidden'
} md:block bg-blue-900 w-64 py-4 `}
>
 

<Menu as="div" className="relative inline-block z-50">
<div className='py-5'>
<Menu.Button className="inline-flex w-full justify-center justify-end"> 

<ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
<span className="md:block font-medium text-white">
&nbsp;{user?.email} 
</span>             
</Menu.Button> 
</div>
          

<Transition
  as={Fragment}
  enter="transition ease-out duration-100"
  enterFrom="transform scale-95"
  enterTo="transform scale-100"
  leave="transition ease-in duration=75"
  leaveFrom="transform scale-100"
  leaveTo="transform scale-95"
>
<Menu.Items className="absolute py-2 px-1 bg-blue-100 rounded shadow-sm">
<div className="px-2 px-1 py-0 w-60">
<Menu.Item>
<Link
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2">
<PencilIcon className="h-4  rounded " />
Edit
</Link>
</Menu.Item>


<Menu.Item>
<Link
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<CreditCardIcon className="h-4 w-4 mr-2" />
Billing
</Link>
</Menu.Item>

<Menu.Item>
<Link
href="profile/"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiOutlineUserCircle className="h-4 w-4 mr-2" />
My Account
</Link>
</Menu.Item>

<Menu.Item>
<Link  onClick={handleSignout}
href="#"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiOutlineLogout className="h-4 w-4 mr-2" />
SignOut
</Link>
</Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>        
         

<br></br>


        <Menu as="div" className="relative inline-block z-40">
<div className='py-3'>
<Menu.Button className="inline-flex w-full justify-center justify-end"> 
<ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
<span className="md:block font-medium text-white z-0">
&nbsp;Contacts
</span>             
</Menu.Button>
</div>
          

<Transition
  as={Fragment}
  enter="transition ease-out duration-100"
  enterFrom="transform scale-95"
  enterTo="transform scale-100"
  leave="transition ease-in duration=75"
  leaveFrom="transform scale-100"
  leaveTo="transform scale-95"
>
<Menu.Items className="absolute py-2 px-1 bg-blue-100 rounded shadow-sm">
<div className="px-2 px-1 py-0 w-60">
 
 <Menu.Item>
<Link
href="/sms/contacts-add"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiUserAdd className="h-5 w-5 mr-2" />
Add
</Link>
</Menu.Item>


<Menu.Item>
<Link
href="/sms/contacts-list"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<CreditCardIcon className="h-5 w-5 mr-2" />
List
</Link>
</Menu.Item>

<Menu.Item>
<Link
href="/sms/contacts-upload"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<CreditCardIcon className="h-5 w-5 mr-2" />
Upload
</Link>
</Menu.Item>

</div>
</Menu.Items>
</Transition>
</Menu>        




<br></br>

<Menu as="div" className="relative inline-block z-30">
<div className='py-3'>
<Menu.Button className="inline-flex w-full justify-center justify-end"> 
<ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
<span className="md:block font-medium text-white">
&nbsp;Groups
</span>             
</Menu.Button>
</div>
          

<Transition
  as={Fragment}
  enter="transition ease-out duration-100"
  enterFrom="transform scale-95"
  enterTo="transform scale-100"
  leave="transition ease-in duration=75"
  leaveFrom="transform scale-100"
  leaveTo="transform scale-95"
>
<Menu.Items className="absolute py-2 px-1 bg-blue-100 rounded shadow-sm">
<div className="px-2 px-1 py-0 w-60">
 
 <Menu.Item>
<Link
href="/sms/groups-add"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<HiUserAdd className="h-5 w-5 mr-2" />
Add
</Link>
</Menu.Item>


<Menu.Item>
<Link
href="/sms/groups-list"
className="flex justify-start hover:bg-blue-200 hover:text-blue-900 rounded text-blue-900 p-2"
>
<CreditCardIcon className="h-5 w-5 mr-2" />
List
</Link>
</Menu.Item>
 
</div>
</Menu.Items>
</Transition>
</Menu>        







        
        <div className="flex flex-col">
        <Link href="/sms/sendsms">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/"
              ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <div className="mr-2">
              {/* <HomeIcon className="h-5 w-5" /> */}
               <HiChat className="h-5 w-5"/>
            </div>
            <div>
              <p>Send SMS</p>
            </div>
          </div>
        </Link>


        <Link href="/sms/contact">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/"
              ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <div className="mr-2">
                 <HiPlusCircle className="h-5 w-5"/>
            </div>
            <div>
              <p>Contacts</p>
            </div>
          </div>
        </Link>


{/* 
        <Link href="/sms/groups">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/about"
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
 

            <div className="mr-2"> 
              <HiUserGroup  className="h-5 w-5" />
            </div>
            <div>
              <p>Groups</p>
            </div>
          </div>
        </Link> */}

       

        <Link href="/sms/schedule">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/billing"
              ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <div className="mr-2">
              <HiClock className="h-5 w-5" />
            </div>
            <div>
              <p>Scheduled SMS</p>
            </div>
          </div>
        </Link>

     

        <Link href="/sms/schedule">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/billing"
              ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <div className="mr-2">
              <HiArchive className="h-5 w-5" />
            </div>
            <div>
              <p>SMS Archives</p>
            </div>
          </div>
        </Link>


        <Link href="/sms/billing">
          <div
            className={`pl-2 py-2 text-center cursor-pointer mb-2 flex items-center transition-colors ${
              router.pathname == "/billing"
              ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <div className="mr-2">
              <HiCreditCard className="h-5 w-5" />
            </div>
            <div>
              <p>SMS Billing</p>
            </div>
          </div>
        </Link> 
      </div> 
        </aside>

        <div className="p2 overflow-y-auto h-full w-screen flex-1">  {children}  </div> 
        {/* <main className="flex-1 p-4">{children}</main> */}
 
      </div>
    </div>
  )
}
} //if is authenticated

export default SMSLayout
