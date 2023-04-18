import { useSelector } from 'react-redux';
import PrivateLayout from '../../components/layout/PrivateLayout';


const DashboardPage = () => {
  const user = useSelector((state) => state.user.user);
 
  return (<>
    <PrivateLayout>
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.name}!</p>
    </div>
    </PrivateLayout>
  </>
    
  );
};

export default (DashboardPage);
