import * as yup from 'yup';

// date: yup.date().typeError('Invalid date').required('Date is required'),
//   lowerCase: yup.string().test('case-sensitive', 'String must be case-sensitive', (value) => value === value.toLowerCase())
//   .required('String is required'),
//   money: yup.number().min(0, 'Amount must be greater than or equal to 0').required('Amount is required'),
//   number: yup.number().typeError('Invalid number').required('Number is required'),
//   url: yup.string().url('Invalid URL').required('URL is required'),
//   phone: yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required')

const editUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email address!").required("Email is required!"),
  name: yup.string("Invalid name").required("Name is required!"),
  role: yup.string().required("Role is required!")
});

 


module.exports={
    editUserSchema  
}