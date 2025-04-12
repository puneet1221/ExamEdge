import React, { useState } from 'react';
import Sidebar from '../SideBar/SideBar';
import ExamsList from '../ExamPage';
import './adminHome.css';
import { useAppContext } from '../AppContext/AppContext';

const AdminHome = () => {
 const {menuActive,setMenuActive}=useAppContext();
  return (
    <div className="admin-home-layout">
      {/* Sidebar */}
     {menuActive &&<div className="sidebar-container">
        <Sidebar />
      </div>}

    </div>
  );
};

export default AdminHome;
