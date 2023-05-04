import React,{ useEffect} from 'react';
import 'flag-icon-css/css/flag-icons.min.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from '../../../lib/validate-phone'
import { countries,allowedCountries } from './countries';
 



const CountrySelect = ({ value, onChange,props }) => {
  const handleOnChange = (phoneNumber, country) => {
    console.log("country default code",props)
    const isPhoneValid=isValidPhoneNumber(phoneNumber,country.countryCode.toUpperCase()) || false
    onChange({value: phoneNumber,code: country.countryCode,isValid:isPhoneValid || '',
    });
  };
 
  


  return (
    <PhoneInput 
      country={value.code}
      value={value.value}
      onChange={handleOnChange}
           onlyCountries={allowedCountries}
      // countryCodeEditable={false}
      inputClass={{ className: 'text-black' }}
      
    />
  );
};

export default CountrySelect;

 

