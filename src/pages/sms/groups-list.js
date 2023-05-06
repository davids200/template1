import React, { useState } from 'react';
import GroupList from '../../../components/sms/GroupList'
import GroupCreate from '../../../components/sms/GroupCreate'
import SMSLayout from '../../../components/layout/SMSLayout';

const Group = () => {


return (
    <SMSLayout>
<div className='rounded-md bg-blue-900 mt-5 shadow-md py-auto md:w-screen h-full sm:w-screen'>

 <h2 className='text-white text-lg px-2 py-2'>Group List</h2>
<GroupList/>
 </div> 
 </SMSLayout>
 );
};

export default Group;
 