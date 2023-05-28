import PrivateLayout from '../../components/layout/PrivateLayout'
import Head from "next/head"



import Router, { useRouter } from "next/router"

function Page() {
   
    return (<>
    <PrivateLayout>
<Head>
   <title>Home</title> 
</Head>
    
    <div className="grid place-content-center h-screen">
      <h2>This is home page</h2>
      <p>Welcome to home page.</p>
    </div>
    </PrivateLayout>
    </>
  )
}
  
export default (Page)
