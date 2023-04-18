import React from 'react'
import UploadProfilePhoto from '../../components/auth/UploadProfilePhoto'
import PrivateLayout from '../../components/layout/PrivateLayout'

function UploadFile() {
  return (
  <>
  <PrivateLayout>
    <UploadProfilePhoto/>
    </PrivateLayout>
  </>
  )
}

export default UploadFile
