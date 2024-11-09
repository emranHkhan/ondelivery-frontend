import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { House, LayoutDashboard, UtensilsCrossed, Store, Pizza, ChevronLeft, ChevronRight, LogOut, Menu as MenuIcon } from 'lucide-react';
import styles from './DashboardLayout.module.css';

const menuItems = [
  {
    title: 'Home',
    icon: <House size={20} />,
    path: '/'
  },
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/admin'
  },
  {
    title: 'Categories',
    icon: <UtensilsCrossed size={20} />,
    path: '/admin/categories'
  },
  {
    title: 'Food Items',
    icon: <Pizza size={20} />,
    path: '/admin/food-items'
  },
  {
    title: 'Restaurants',
    icon: <Store size={20} />,
    path: '/admin/restaurants'
  }
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* dashboard-sidebar */}
      <aside className={`${styles.dashboardSidebar} ${collapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        {/* dashboard-sidebar Header */}
        <div className={styles.dashboardSidebarHeader}>
          <h1 className={collapsed ? styles.hidden : ''}>Admin Panel</h1>
          <button className={styles.collapseButton} onClick={toggleSidebar}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className={styles.dashboardSidebarNav}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''} ${collapsed ? styles.collapsed : ''}`}
            >
              {item.icon}
              <span className={collapsed ? styles.hidden : ''}>
                {item.title}
              </span>
            </button>
          ))}
        </nav>

        {/* dashboard-sidebar Footer */}
        <div className={styles.dashboardSidebarFooter}>
          <button className={`${styles.logoutButton} ${collapsed ? styles.collapsed : ''}`} onClick={() => navigate('/logout')}>
            <LogOut size={20} />
            <span className={collapsed ? styles.hidden : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${styles.mainContent} ${collapsed ? styles.expanded : ''}`}>
        {/* Header */}
        <header className={styles.mainHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.mobileMenuButton} onClick={toggleSidebar}>
              <MenuIcon />
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img src="https://www.gravatar.com/avatar" alt="User" />
            </div>
            <span>Welcome, User</span>
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
