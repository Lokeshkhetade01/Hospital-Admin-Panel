import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  UserRound, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Appointments", icon: <CalendarDays size={20} />, path: "/appointments" },
    { name: "Doctors", icon: <UserRound size={20} />, path: "/doctors" },
    { name: "Users", icon: <Users size={20} />, path: "/users" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "/payments" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
    { name: "FAQ", icon: <BarChart3 size={20} />, path: "/faq" },
  ];

  return (
    <div className="w-64 min-h-screen  bg-slate-50 dark:bg-slate-900 text-white flex flex-col shadow-2xl border-r border-white/5 font-sans">
      
      {/* Brand Header */}
      <div className="p-8 pb-10">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          MediCare<span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
        </h2>
        <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-80">
          Admin Panel
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            // NavLink wrapper for standard classes
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
              ${isActive 
                ? "bg-blue-600/30 text-white shadow-inner border border-white/10" 
                : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {/* Destructure isActive from the child function for internal UI elements */}
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </span>
                <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto border-t border-white/5 space-y-2">
       
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;