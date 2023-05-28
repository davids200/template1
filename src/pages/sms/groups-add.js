import React, { useState } from 'react';
import GroupList from '../../../components/sms/GroupList'
import GroupCreate from '../../../components/sms/GroupCreate'
import SMSLayout from '../../../components/layout/SMSLayout';

const Group = () => {


return (
    <SMSLayout>
<div className='mx-auto rounded-md mt-5 py-auto w-96 h-full sm:w-screen py-2'>
 
<GroupCreate/>
 
 </div> 
 </SMSLayout>
 );
};

export default Group;
 