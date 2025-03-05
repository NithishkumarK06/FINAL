
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  FileText,
  Settings,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  userType: 'patient' | 'doctor' | 'admin';
  userName: string;
  userRole: string;
  onLogout: () => void;
}

const Sidebar = ({ userType, userName, userRole, onLogout }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const patientLinks = [
    { path: '/find-hospital', label: 'Find Hospital', icon: Search },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/medical-records', label: 'Medical Records', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  const doctorLinks = [
    { path: '/find-hospital', label: 'Find Hospital', icon: Search },
    { path: '/my-patients', label: 'My Patients', icon: User },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/medical-records', label: 'Medical Records', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  const links = userType === 'doctor' ? doctorLinks : patientLinks;
  
  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };
  
  return (
    <motion.div
      className="h-screen bg-white border-r border-gray-100 overflow-hidden flex flex-col"
      initial="expanded"
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-4 flex justify-between items-center">
        <div className={cn(isCollapsed && 'opacity-0 invisible', 'transition-opacity duration-200')}>
          <Logo variant="small" />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>
      
      <div className={cn(
        "mt-2 px-4 py-3 bg-hospitrax-50/50 flex items-center gap-3",
        isCollapsed && "justify-center"
      )}>
        <div className="h-8 w-8 rounded-full bg-hospitrax-100 flex items-center justify-center text-hospitrax-700">
          <User size={16} />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h3 className="text-sm font-medium text-gray-900 truncate">{userName}</h3>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        )}
      </div>
      
      <nav className="mt-6 flex-1 px-2">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-hospitrax-100 text-hospitrax-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon size={20} strokeWidth={1.75} />
                  {!isCollapsed && <span>{link.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <button
          onClick={onLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm w-full",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} strokeWidth={1.75} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
