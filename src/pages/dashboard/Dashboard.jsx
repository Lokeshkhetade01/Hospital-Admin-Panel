import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/slices/dashboard/getDashboardStat';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Breadcrumbs from '../../components/uiElement/Breadcrumbs';

const Dashboard = () => {
  const dispatch = useDispatch();
  // tableLoading state extracted from slice
  const { stats, recentAppointments, loading, tableLoading, pagination } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData(1));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      dispatch(fetchDashboardData(newPage));
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const statsConfig = [
    { id: 1, label: 'Total Patients', value: stats?.totalPatients || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 2, label: 'Verified Doctors', value: stats?.verifiedDoctors || 0, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 3, label: 'Unverified Doctors', value: stats?.unverifiedDoctors || 0, icon: UserPlus, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 4, label: 'Pending Appointments', value: stats?.pendingCount || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      completed: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-100"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  const breadcrumbPaths = [
    // { label: 'Dashboard', link: '/dashboard' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans shadow-sm">
      <div className="mb-5">
        {/* <h1 className="text-2xl font-bold text-gray-800">Hospital Analytics</h1> */}
        <Breadcrumbs items={breadcrumbPaths}/>
        {/* <p className="text-gray-500">Welcome back! Here's what's happening today.</p> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:scale-[1.02]">
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`${stat.color} w-6 h-6`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          </div>
          
          <div className="overflow-x-auto min-h-[400px] relative">
            {/* Table Loader Overlay */}
            {tableLoading && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}

            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100">
                  <th className="pb-4 font-medium">Patient</th>
                  <th className="pb-4 font-medium">Doctor</th>
                  <th className="pb-4 font-medium">Date & Time</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAppointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium text-gray-700">{app.patient?.name}</td>
                    <td className="py-4">
                      <div className="text-sm text-gray-800">{app.doctor?.user?.name}</div>
                      <div className="text-xs text-gray-400">{app.doctor?.specialization}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-gray-800">{formatDate(app.date)}</div>
                      <div className="text-xs text-gray-400">{app.timeSlot}</div>
                    </td>
                    <td className="py-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 text-right font-semibold text-gray-700">₹{app.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500">
              Showing page <span className="font-medium">{pagination?.page}</span> of <span className="font-medium">{pagination?.totalPages}</span>
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || tableLoading}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages || tableLoading}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Financial Summary Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Financial Overview</h2>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 text-sm font-medium">Monthly Revenue</span>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-3xl font-bold text-blue-900">₹{stats?.monthlyRevenue || 0}</h4>
              <p className="text-xs text-blue-600 mt-1">Updates based on completed visits</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Platform Fees Collected</span>
                <span className="font-semibold text-gray-800">₹29.00/app</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Today's Total</span>
                <span className="font-semibold text-gray-800">{stats?.todayTotal || 0}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="pt-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming Scheduling
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;