import { useQuery } from '@apollo/client'; 
import { useState } from 'react';
import {GET_ALL_GROUPS} from '../../graphql/queries/smsQueries'
import {   
  HiOutlineTrash,
  } from "react-icons/hi";


const PAGE_SIZE = 7;

export default function Groups() {
  let [offset, setOffset] = useState(0);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
    variables: { limit: PAGE_SIZE, offset }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
   
  const totalGroups=data?.groups[0]?.totalGroups;

function handlePrevious(){  
if(offset<PAGE_SIZE) setOffset(0)
else
setOffset(offset - PAGE_SIZE)
}

function handleNext(){ 
  setOffset(offset + PAGE_SIZE)
}
 
function handleDelete(group){
  setShowDeletePrompt(true);
}


function handleDeleteConfirm() {
  // Perform the delete action here...
  setShowDeletePrompt(false);
}

return (
<div className=''>
  <div className=' text-black m-2 rounded-md shadow-md p-2 bg-white'>
  
  
  {showDeletePrompt && (
    <div className='bg-red-700 p-2 rounded-md modal'>
      <p className='px-5 mb-5 text-white items-center'>Are you sure you want to delete this?</p>
      <div className='flex justify-evenly px-5'>
      <button onClick={handleDeleteConfirm} className='py-1 px-2 rounded bg-gray-100'>Yes</button>
      <button onClick={() => setShowDeletePrompt(false)} className='py-1 px-2 rounded bg-gray-100'>No</button>
      </div>
    </div>
  )}

      
      
        {data.groups.map(group => (<>
          <div key={group.id} className='flex justify-between bg-white hover:bg-gray-400 hover:text-white border-b-2 mb-1 cursor-pointer hover:text-green-500'>
          <b>{group.name.toUpperCase()} ({group.totalContacts})</b> <i className='text-right'> {group.country}</i>

          <div className='btn text-red-200 cursor-pointer hover:text-red-500'><HiOutlineTrash onClick={()=>handleDelete(group)}/></div>
          </div>
          
          </>
        ))}
      </div>
      
      {(totalGroups>PAGE_SIZE) && <>
      <div className='flex mb-5 p-2 justify-center items-center gap-2'>
      
      <button className="button text-black py-1 px-3 bg-gray-300 rounded-md"
      disabled={offset <1} onClick={() => handlePrevious()} >
         Prev
      </button>
      <button className="button text-black py-1 px-3 bg-gray-300 rounded-md"
        disabled={((offset/PAGE_SIZE)+1)===Math.ceil(totalGroups/PAGE_SIZE)}
        onClick={() => handleNext()}
      >
        Next 
      </button>
      <div className='text-md text-black'>Page { Math.round((offset/PAGE_SIZE)+1)} of { Math.ceil(totalGroups/PAGE_SIZE)}</div>
      </div></>} 


   
 
    </div>
  );
}
