import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MainLayout.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainLayout = ({ onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getPageTitle = (path) => {
    const titles = {
      '/': 'Dashboard',
      '/users': 'Usuarios',
      '/league': 'Ligas',
      '/analytics': 'Analíticas',
      '/settings': 'Configuración'
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <div className="app-container">
      <Sidebar
        onLogout={onLogout}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Header
          currentPage={getPageTitle(location.pathname)}
        />

        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 