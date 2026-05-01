import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentById, clearDetails } from '../../redux/slices/appointment/getAppointmentByIdSlice';
import { 
  ArrowLeft, Calendar, Clock, Phone, Mail, 
  Stethoscope, MapPin, CreditCard, Activity, ShieldCheck, User 
} from 'lucide-react';
import Breadcrumbs from '../../components/uiElement/Breadcrumbs';

const AppointmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { appointment, loading, error } = useSelector((state) => state.appointmentById);

  const breadcrumbPaths = [
    { label: 'Appointments', link: '/appointments' },
    { label: 'Appointment Details', link: '#' }
  ];

  useEffect(() => {
    dispatch(fetchAppointmentById({ id, token }));
    return () => dispatch(clearDetails());
  }, [dispatch, id, token]);

  // Helper function to show first letter if avatar is missing
  const renderAvatar = (avatar, name, sizeClass = "w-24 h-24 text-2xl") => {
    if (avatar && avatar !== "" && !avatar.includes("undefined")) {
      return (
        <img 
          src={avatar} 
          className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} rounded-3xl object-cover shadow-lg border-4 border-gray-50 mb-4`} 
          alt={name}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
      );
    }
    return (
      <div className={`${sizeClass} rounded-3xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black border-4 border-white shadow-lg mb-4 uppercase`}>
        {name?.charAt(0) || <User size={30} />}
      </div>
    );
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#f8fafc]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-600 font-black tracking-widest text-xs uppercase">Fetching Records...</p>
    </div>
  );

  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  if (!appointment) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header & Back --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
            >
              <ArrowLeft size={18} />
            </button>
            <Breadcrumbs items={breadcrumbPaths}/>
          </div>
          <div className="text-right">
            <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.1em] uppercase border shadow-sm ${
              appointment.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-100' : 
              appointment.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
              'bg-red-50 text-red-600 border-red-100'
            }`}>
              {appointment.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Patient & Doctor --- */}
          <div className="space-y-6">
            
            {/* Patient Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-white relative overflow-hidden">
              <div className="flex flex-col items-center text-center">
                {renderAvatar(appointment.patient?.avatar, appointment.patient?.name)}
                <h2 className="text-xl font-black text-gray-800">{appointment.patient?.name}</h2>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-6 px-3 py-1 bg-blue-50 rounded-full mt-1">Patient Identity</p>
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400"><Mail size={16}/></div>
                  <span className="text-sm font-semibold text-slate-600 truncate">{appointment.patient?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400"><Phone size={16}/></div>
                  <span className="text-sm font-semibold text-slate-600">{appointment.patient?.phone}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-tighter mb-1">Gender</p>
                    <p className="text-xs font-bold text-blue-700 capitalize">{appointment.patient?.gender}</p>
                  </div>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-tighter mb-1">Birth Date</p>
                    <p className="text-xs font-bold text-blue-700">{new Date(appointment.patient?.dob).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-8 shadow-xl shadow-blue-600/20 text-white relative">
              <div className="flex items-center gap-4 mb-6">
                 {/* Mini Fallback for Doctor */}
                 {appointment.doctor?.user?.avatar ? (
                    <img src={appointment.doctor.user.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" alt="Dr" />
                 ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-black text-xl border-2 border-white/20">
                        {appointment.doctor?.user?.name?.charAt(0)}
                    </div>
                 )}
                <div>
                  <h3 className="font-bold text-lg leading-tight">{appointment.doctor?.user?.name}</h3>
                  <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest mt-1 opacity-80">{appointment.doctor?.specialization}</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm font-medium text-blue-50">
                  <ShieldCheck size={18} className="opacity-70" /> <span>Reg: {appointment.doctor?.regNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-blue-50">
                  <MapPin size={18} className="opacity-70" /> <span>{appointment.doctor?.hospital}, {appointment.doctor?.city}</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Details & Billing --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Calendar size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Appointment Date</p>
                  <p className="text-xl font-black text-gray-800">{new Date(appointment.date).toDateString()}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned Slot</p>
                  <p className="text-xl font-black text-gray-800">{appointment.timeSlot}</p>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity size={20} className="text-red-500" />
                    <h3 className="font-black text-gray-800 uppercase tracking-tight">Reported Symptoms</h3>
                </div>
                <span className="text-[10px] font-black text-gray-300">REF: {id.slice(-6)}</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-600 font-medium leading-relaxed italic text-lg">
                  "{appointment.symptoms}"
                </p>
              </div>
            </div>

            {/* Billing */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CreditCard size={20}/></div>
                <h3 className="font-black text-gray-800 uppercase tracking-tight">Invoice Breakdown</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm uppercase tracking-wide">
                  <span>Consultation</span>
                  <span className="text-slate-800 font-black">₹{appointment.fees}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm uppercase tracking-wide">
                  <span>Platform Fee</span>
                  <span className="text-slate-800 font-black">₹{appointment.platformFee}</span>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Settlement Total</p>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${appointment.isPaid ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></span>
                        <p className={`text-xs font-black uppercase tracking-tighter ${appointment.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                        {appointment.isPaid ? 'Payment Confirmed' : 'Payment Awaited'}
                        </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{appointment.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;