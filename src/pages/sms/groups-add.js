import React, { useState } from 'react';
import GroupList from '../../../components/sms/GroupList'
import GroupCreate from '../../../components/sms/GroupCreate'
import SMSLayout from '../../../components/layout/SMSLayout';

const Group = () => {


return (
    <SMSLayout>
<div className='mx-auto rounded-md bg-blue-900 mt-5 shadow-md py-auto w-96 md:w-screen h-full sm:w-screen py-2'>
 
<GroupCreate/>
 
 </div> 
 </SMSLayout>
 );
};

export default Group;
 