

import React, { useState } from 'react';
import SendSMS from '../../../components/sms/SendSMS'
import PrivateLayout from '../../../components/layout/PrivateLayout'

export default function sendsms() {
 
    
  return (
    <>
    <PrivateLayout>
        <div>
    <SendSMS/>
    </div>
    </PrivateLayout>
    </>
  )
}
