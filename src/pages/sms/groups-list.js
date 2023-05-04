import React, { useState } from 'react';
import GroupList from '../../../components/sms/GroupList'
import GroupCreate from '../../../components/sms/GroupCreate'
import SMSLayout from '../../../components/layout/SMSLayout';

const Group = () => {


return (
    <SMSLayout>
<div className='mx-auto  bg-gray-100 rounded-md shadow-md py-auto w-96 md:w-screen h-full sm:w-screen py-2'>

 <h2 className='text-black px-2 py-2'>Group List</h2>
<GroupList/>
 </div> 
 </SMSLayout>
 );
};

export default Group;
 