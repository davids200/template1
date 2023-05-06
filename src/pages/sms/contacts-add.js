import React from 'react'
import SMSLayout from '../../../components/layout/SMSLayout';
import ContactsCreate from '../../../components/sms/ContactsCreate'

function ContactsAdd() {
   
  return (
    <SMSLayout>
   <div className='mx-auto rounded-md bg-blue-900 mt-5 shadow-md py-auto w-96 md:w-screen h-full sm:w-screen py-2'>
    <ContactsCreate/>
    </div>
    </SMSLayout>
  )
}

export default ContactsAdd;
