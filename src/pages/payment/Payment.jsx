import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  TrendingUp, 
  User, 
  Calendar, 
  CheckCircle, 
  Clock, 
  IndianRupee,
  Search,
  ExternalLink
} from "lucide-react";
import { fetchPayments } from "../../redux/slices/payments/getPayment";

const Payment = () => {
  const dispatch = useDispatch();
  const { paymentData, loading, error } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block border border-red-100">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-6 border border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */} 
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Payments Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track your hospital revenue</p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
             <Search size={18} className="text-slate-400" />
             <input type="text" placeholder="Search by name..." className="bg-transparent outline-none text-sm w-48 text-slate-600" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Monthly Revenue" 
            value={`₹${paymentData?.monthlyRevenue || 0}`} 
            icon={<TrendingUp className="text-blue-600" />}
            color="bg-blue-50"
            trend="+12.5% from last month"
          />
          <StatCard 
            title="Total Transactions" 
            value={paymentData?.total || 0} 
            icon={<CreditCard className="text-emerald-600" />}
            color="bg-emerald-50"
            trend="Live Updates"
          />
          <StatCard 
            title="Platform Status" 
            value="Active" 
            icon={<CheckCircle className="text-purple-600" />}
            color="bg-purple-50"
            trend="All systems go"
          />
        </div>

        {/* Transactions Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Payments</h2>
            
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[13px] tracking-wider">
                  <th className="px-6 py-4 font-semibold">Patient Details</th>
                  <th className="px-6 py-4 font-semibold">Doctor / Hospital</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paymentData?.payments?.map((payment, index) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={payment._id} 
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                          {payment.patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{payment.patient.name}</p>
                          <p className="text-xs text-slate-500">{payment.patient.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-slate-700 font-medium">Dr. {payment.doctor.user.name}</p>
                        <p className="text-xs text-slate-400 italic">{payment.doctor.hospital}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 flex items-center">
                          <IndianRupee size={14} className="mr-0.5" />{payment.amount}
                        </span>
                        <span className="text-[11px] text-slate-400">ID: {payment.razorpayOrderId.split('_')[1]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar size={12}/> {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12}/> {new Date(payment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Light Stat Card
const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-50">
      <span className="text-xs font-medium text-slate-400">{trend}</span>
    </div>
  </motion.div>
);

export default Payment;