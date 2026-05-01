import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../../redux/slices/analytics/getAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  Clock, 
  XCircle, 
  Activity,
  ArrowUpRight 
} from 'lucide-react';

const Analytics = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // Helper to map status to colors and icons
  const getStatusConfig = (id) => {
    const configs = {
      cancelled: { color: 'text-red-600', bg: 'bg-red-50', icon: <XCircle size={20} /> },
      pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={20} /> },
      completed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CalendarCheck size={20} /> },
      default: { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <Activity size={20} /> }
    };
    return configs[id.toLowerCase()] || configs.default;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4 text-red-500">
        <XCircle size={40} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800">Something went wrong</h3>
      <p className="text-gray-500">{typeof error === 'string' ? error : 'Failed to load analytics'}</p>
      <button 
        onClick={() => dispatch(fetchAnalytics())}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Retry
      </button>
    </div>
  );

  if (!data) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-5 bg-white border border-gray-200 min-h-screen"
    >
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-slate-500 mt-1">Real-time hospital performance and patient insights.</p>
        </div>
        
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.apptStatus.map((status) => {
          const config = getStatusConfig(status._id);
          return (
            <motion.div 
              key={status._id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col"
            >
              <div className={`w-10 h-10 ${config.bg} ${config.color} rounded-lg flex items-center justify-center mb-4`}>
                {config.icon}
              </div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{status._id}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">{status.count.toLocaleString()}</h3>
            </motion.div>
          );
        })}

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-100 flex flex-col text-white"
        >
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <Users size={20} />
          </div>
          <p className="text-sm font-semibold text-indigo-100 uppercase tracking-wide">New Patients</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-3xl font-bold">{data.newPatients[0]?.count || 0}</h3>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ArrowUpRight size={12} /> This Month
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Specialization Breakdown */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Top Specializations</h2>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All Report</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {data.topSpecializations.map((spec, index) => (
              <div key={spec._id} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-700">{spec._id}</span>
                  <span className="text-slate-900 font-bold">{spec.total} appointments</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((spec.total / 10) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-indigo-500 h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Chart Placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <TrendingUp size={48} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Revenue Growth</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
            Financial analytics and monthly trends are currently being calculated.
          </p>
          <div className="mt-6 w-full h-24 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center">
             <span className="text-xs text-slate-400 font-medium italic tracking-widest">WAVEFORM_PREVIEW</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;