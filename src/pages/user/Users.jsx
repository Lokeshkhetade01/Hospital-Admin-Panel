import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/slices/user/getUser';
import { toggleBlockStatus } from '../../redux/slices/user/blockUserSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Mail, Phone, Search, Ban, UserCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { loading: actionLoading } = useSelector((state) => state.blockUser);
  
  const [activeTab, setActiveTab] = useState('doctor');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleToggleBlock = async (userId) => {
    const resultAction = await dispatch(toggleBlockStatus(userId));
    if (toggleBlockStatus.fulfilled.match(resultAction)) {
      // Refresh the list to show updated status
      dispatch(fetchAllUsers());
    }
  };

  const filteredUsers = users.filter(user => 
    user.role === activeTab && 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="p-10 text-center animate-pulse text-indigo-600 font-bold">Fetching Medical Directory...</div>;

  return (
    <div className="p-4 md:p-6 bg-white border border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500 text-sm">Manage and monitor all hospital staff and patients.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 bg-white text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit mb-8">
          {['doctor', 'patient'].map((role) => (
            <button 
              key={role}
              onClick={() => setActiveTab(role)}
              className={`px-8 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === role ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {role}s ({users.filter(u => u.role === role).length})
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white border ${user.isBlocked ? 'border-red-100 bg-red-50/10' : 'border-slate-200'} rounded-2xl p-6 transition-all group relative overflow-hidden shadow-sm hover:shadow-md`}
              >
                {user.isBlocked && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-3 py-1 rounded-bl-lg font-bold uppercase tracking-widest z-10">
                    Blocked
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${user.isBlocked ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <User size={28} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-base truncate flex items-center gap-2">
                      {user.name}
                      {user.role === 'doctor' && <ShieldCheck size={14} className="text-blue-500 flex-shrink-0" />}
                    </h3>
                    <div className="space-y-1 mt-2">
                      <p className="text-xs text-slate-500 flex items-center gap-2 truncate">
                        <Mail size={12} className="flex-shrink-0" /> {user.email}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <Phone size={12} className="flex-shrink-0" /> {user.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    Since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    disabled={actionLoading}
                    onClick={() => handleToggleBlock(user._id)}
                    className={`p-2 rounded-xl transition-all active:scale-95 ${user.isBlocked ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}
                    title={user.isBlocked ? "Unblock User" : "Block User"}
                  >
                    {user.isBlocked ? <UserCheck size={20} /> : <Ban size={20} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No {activeTab}s found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;