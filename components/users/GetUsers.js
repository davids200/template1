import { useQuery, gql } from "@apollo/client";
import {GET_USERS} from "../../graphql/queries/userQueries"
import { useState } from "react";

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
 const [showModal, setShowModal] = useState(true);

  const handleModal = () => {
    setShowModal(!showModal);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error !!</p>;

  return (<>
 
   <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-50">
            <h2 className="text-lg font-bold mb-4">Modal Title</h2>



 <div class="overflow-x-auto sm:overflow-x-hidden">
  <table class="table table-auto">
        <thead>
          <tr>
            <th>Header 1111111111111111111111111111</th>
            <th>Header 222222222222222222222222222</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Column 1</td>
            <td>Row 1, Column 2</td>
            <td>Row 1, Column 3</td>
          </tr>
          <tr>
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
            <td>Row 2, Column 3</td>
          </tr>
          <tr>
            <td>Row 3, Column 1</td>
            <td>Row 3, Column 2</td>
            <td>Row 3, Column 3</td>
          </tr>
          <tr>
            <td>Row 4, Column 1</td>
            <td>Row 4, Column 2</td>
            <td>Row 4, Column 3</td>
          </tr>
          <tr>
            <td>Row 5, Column 1</td>
            <td>Row 5, Column 2</td>
            <td>Row 5, Column 3</td>
          </tr>
          <tr>
            <td>Row 6, Column 1</td>
            <td>Row 6, Column 2</td>
            <td>Row 6, Column 3</td>
          </tr>
          <tr>
            <td>Row 7, Column 1</td>
            <td>Row 7, Column 2</td>
            <td>Row 7, Column 3</td>
          </tr>
          <tr>
            <td>Row 8, Column 1</td>
            <td>Row 8, Column 2</td>
            <td>Row 8, Column 3</td>
          </tr>
          <tr>
            <td>Row 9, Column 1</td>
            <td>Row 9, Column 2</td>
            <td>Row 9, Column 3</td>
          </tr>
        </tbody>
      </table>
    </div>


            
          </div>
        </div>

{/* 

  <div className="flex justify-center  items-center">
  <div className="overflow-x-auto  bg-gray-400 p-2 rounded-md">
      <table className="table-auto w-1/3 md:w-full sm:w-full p-2 rounded-md">
        <thead>
         <tr className="bg-gray-200">
      <th className="border border-gray-400 px-4 py-2">Name</th>
        <th className="border border-gray-400 px-4 py-2">Email</th>
        <th className="border border-gray-400 px-4 py-2">Role</th>
      <th className="border border-gray-400 px-4 py-2">Edit</th>
      <th className="border border-gray-400 px-4 py-2">Del</th>
    </tr>
        </thead>
        <tbody>
     {data.getAllUsers.map((item) => (
      <tr  key={item.id} className="bg-gray-100">       
          <td className="border px-6 py-4">{item.name}</td>
          <td className="border px-6 py-4">{item.email}</td>
          <td className="border px-6 py-4">{item.role}</td>
          <td  className="border px-6 py-4">edit</td>
          <td  className="border px-6 py-4">del</td>
        </tr>
      ))}
    
    </tbody>

      </table>
      </div>
    </div> */}

  
 </> );
}
