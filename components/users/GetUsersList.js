import React from 'react'
import styles from '../../src/styles/UserList.module.css'

const UserList = ({ data }) => {
  
  return (
    <div className='container'>
   
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>edit</td>
          <td>del</td>
        </tr>
      ))}
   
  
</div>
  )
}

export default UserList
