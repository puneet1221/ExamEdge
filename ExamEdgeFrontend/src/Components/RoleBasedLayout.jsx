import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminNavBar from '../AdminComponents/NavBar/AdminNavBar';
import { useAppContext } from '../Components/AppContext/AppContext';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar';
import Sidebar from './SideBar/SideBar';

const RoleBasedLayout = ({ children }) => {
  const { userDetails, setMenuActive,setUserDetails, menuActive } = useAppContext();
  const [userRole, setUserRole] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (userDetails) {
      setUserRole(userDetails.role);
    }
  }, [userDetails]);

  if(!userDetails.isProfileUpdated){
    console.log(userDetails);
    navigate('/updateProfile');
    
  }

  return (
    <div className="flex flex-col min-h-screen">
    
      {userRole?.role_name === 'ADMIN' ? <AdminNavBar /> : <Navbar />}
      {userRole?.role_name === 'USER' && menuActive ? <Sidebar /> : null}
      <main className="min-h-screen ovefloe-y-scroll">{children}</main>
      <Footer/>
    </div>
  );
};

export default RoleBasedLayout;
