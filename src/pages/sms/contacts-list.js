import React, { useState } from 'react';
import SMSLayout from '../../../components/layout/SMSLayout';
import CountrySelect from '../../../components/common/countries/CountryPhoneSelect';
import UploadExcelContacts from '../../../components/sms/uploadExcelContacts'
import UploadTextContacts from '../../../components/sms/uploadTextContacts'
import { useQuery } from '@apollo/client';
import { GET_ALL_GROUPS } from '../../../graphql/queries/smsQueries'
import Select from '../../../components/sms/SelectGroup'


function ContactsList() {
  return (
    <SMSLayout>
      Contacts list
    </SMSLayout>
  )
}

export default ContactsList
