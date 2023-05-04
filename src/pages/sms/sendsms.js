

import React, { useState } from 'react';
import SendSMS from '../../../components/sms/SendSMS'
import SMSLayout from '../../../components/layout/SMSLayout';


export default function sendsms() {
 
    
  return (
    <>
    <SMSLayout>
        <div>
    <SendSMS/>
    </div>
    </SMSLayout>
    </>
  )
}
