import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../redux/slices/appointment/getAppointmentSlice';
import { updateAppointmentStatus, resetStatusState } from '../../redux/slices/appointment/updateStatusSlice';
import Table from '../../components/uiElement/Table';
import Breadcrumbs from '../../components/uiElement/Breadcrumbs';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'; // Icons import
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const dispatch = useDispatch();
  
  // Redux States
  const { appointments, loading, pagination } = useSelector((state) => state.appointment);
  const { loading: updateLoading, success } = useSelector((state) => state.updateStatus);

  // Local States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('confirmed');
  const [cancelReason, setCancelReason] = useState('');

  const breadcrumbPaths = [{ label: 'Appointments', link: '/appointments' }];
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  // Initial Fetch & Page Change Fetch
  useEffect(() => {
    dispatch(fetchAppointments(pagination.page));
  }, [dispatch]);

  // Handle Success & Refresh
  useEffect(() => {
    if (success) {
      setIsModalOpen(false);
      setCancelReason('');
      dispatch(resetStatusState());
      dispatch(fetchAppointments(pagination.page)); 
    }
  }, [success, dispatch, pagination.page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      dispatch(fetchAppointments(newPage));
    }
  };

  const handleUpdateStatus = () => {
    const payload = { status };
    if (status === 'cancelled' && cancelReason) {
      payload.cancelReason = cancelReason;
    }
    dispatch(updateAppointmentStatus({ id: selectedId, statusData: payload, token }));
  };

  const columns = [
    {
      header: 'Patient',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 uppercase">
            {row.patient?.name?.charAt(0) || 'P'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{row.patient?.name}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{row.patient?.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Doctor',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">{row.doctor?.user?.name}</span>
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wide">{row.doctor?.specialization}</span>
        </div>
      )
    },
    {
      header: 'Date & Slot',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{new Date(row.date).toLocaleDateString('en-GB')}</span>
          <span className="text-[11px] text-indigo-600 font-bold uppercase">{row.timeSlot}</span>
        </div>
      )
    },
    {
      header: 'Payment',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">₹{row.totalAmount}</span>
          <span className={`text-[9px] font-black uppercase ${row.isPaid ? 'text-green-500' : 'text-orange-500'}`}>
            {row.isPaid ? 'PAID' : 'UNPAID'}
          </span>
        </div>
      )
    },
    {
      header: 'Status',
      render: (row) => {
        const statusStyles = {
          pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
          confirmed: 'bg-blue-50 text-blue-700 border-blue-100',
          completed: 'bg-green-50 text-green-700 border-green-100',
          cancelled: 'bg-red-50 text-red-600 border-red-100',
        };
        return (
          <button 
            onClick={() => {
              setSelectedId(row._id);
              setStatus(row.status || 'confirmed');
              setIsModalOpen(true);
            }}
            className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border shadow-sm transition-all hover:scale-105 ${statusStyles[row.status] || 'bg-gray-50'}`}
          >
            {row.status?.toUpperCase()}
          </button>
        );
      }
    },
    {
  header: 'Action',
  render: (row) => (
    <button 
      onClick={() => navigate(`/appointments/${row._id}`)}
      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
    >
      <Eye size={20} />
    </button>
  )
}

  ];

  return (
    <div className="p-5 bg-[#f8fafc] min-h-screen relative">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <Breadcrumbs items={breadcrumbPaths} />
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Bookings</p>
            <p className="text-xl font-black text-blue-600">{pagination.total}</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center py-28 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 font-bold animate-pulse tracking-widest uppercase text-xs">Accessing Database...</p>
            </div>
          ) : appointments.length > 0 ? (
            <>
              <Table columns={columns} data={appointments} />
              
              {/* --- PAGINATION UI --- */}
              <div className="flex items-center justify-between px-8 py-6 border-t border-gray-50 bg-gray-50/30">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Showing Page {pagination.page} of {pagination.pages}
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    disabled={pagination.page === 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all text-gray-600"
                  >
                    <ChevronLeft size={18} strokeWidth={3} />
                  </button>

                  <div className="flex gap-1.5">
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                          pagination.page === i + 1 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                          : 'bg-white text-gray-400 border border-gray-100 hover:border-blue-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={pagination.page === pagination.pages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all text-gray-600"
                  >
                    <ChevronRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-28 italic text-gray-400">No appointments found.</div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl border border-white animate-in zoom-in-95 duration-200">
            <div className="mb-6">
              <h2 className="text-xl font-black text-gray-800">Update Status</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ref ID: {selectedId?.slice(-6)}</p>
            </div>
            
            <div className="space-y-4">
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-gray-700 transition-all"
              >
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancel</option>
              </select>

              {status === 'cancelled' && (
                <textarea 
                  placeholder="Reason for cancellation..."
                  className="w-full p-4 bg-red-50/30 border border-red-100 rounded-2xl outline-none text-sm font-medium text-red-900"
                  rows="3"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black text-gray-400 tracking-widest text-[10px]">DISCARD</button>
              <button 
                disabled={updateLoading}
                onClick={handleUpdateStatus}
                className="flex-1 py-4 bg-blue-600 rounded-2xl font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all text-[10px] tracking-widest"
              >
                {updateLoading ? 'UPDATING...' : 'CONFIRM UPDATE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;