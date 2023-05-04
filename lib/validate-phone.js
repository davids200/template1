import { parsePhoneNumberFromString } from 'libphonenumber-js';


const isValidPhoneNumber = (phoneNumber, isoCode) => {
//function isValidPhoneNumber(phoneNumber, isoCode) {
const parsedNumber = parsePhoneNumberFromString(phoneNumber, isoCode);

// if(parsedNumber){
// console.log("function phone validate",parsedNumber.isValid())
// return true
// }
// else{
//     return false
// }

return parsedNumber ? parsedNumber.isValid() : false;
}


module.exports={
    isValidPhoneNumber
}