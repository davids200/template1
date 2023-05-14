import { useState } from 'react';
import cx from 'classnames'; 

const CountrySelect = ({ countries, onChange,countryCode }) => {
// console.log("countryCodecountryCode",countryCode)
  const [selected, setSelected] = useState(countryCode);

  const handleChange = (event) => {
    setSelected(event.target.value);
     onChange && onChange(event.target.value);
    
  };
  
  return (
    <>    
    <select  onChange={handleChange} className='w-full mr-2 block text-md mb-1 md:mb-0 p-2 rounded'>
    <option  key={countries[0].code} defaultValue={countries[0].name}>        
          {countries[0].name}
        </option>
      {countries.map((country) => (
       
        <option key={country.code} value={country.code}>        
          {country.name}
        </option> 
      ))}
    </select> 
    </>
  );
};

export default CountrySelect;


export async function getServerSideProps(context) {
  try {
    const response = await fetch('https://ipapi.co/json/', { mode: 'cors' });
    console.log('response response:', response.data);
    return { props: { countryCode: '' } };
    const data = await response.json();
    const countryCode = data.country_code;
    return { props: { countryCode } };
  } catch (error) {
    console.error('Error fetching geo data:', error);
    return { props: { countryCode: 'ug' } };
  }
}