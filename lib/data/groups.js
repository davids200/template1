import { useQuery } from '@apollo/client'; 
import { GET_ALL_GROUPS } from '../../graphql/queries/smsQueries'
import { useSelector } from 'react-redux';

let groupOptions;

const GroupOptions = (handler) => async (req, res) => {
   

const   { isAuthenticated,user } = useSelector(state => state.user); 
const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
variables: { limit: 1000, offset:0 }
}); 
   
groupOptions = data.groups.map(group => ({
value: group.id,
label: group.name.toUpperCase()+" ("+group.totalContacts+")",})) 
};

module.exports={
  groupOptions
}




// function GroupOptions(){
// const   { isAuthenticated,user } = useSelector(state => state.user); 
// const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
// variables: { limit: 1000, offset:0 }
// });

// const groupOptions = data.groups.map(group => ({
// value: group.id,
// label: group.name.toUpperCase()+" ("+group.totalContacts+")",
// }))

// console.log("GroupOptions",GroupOptions)
// return GroupOptions;
// } 