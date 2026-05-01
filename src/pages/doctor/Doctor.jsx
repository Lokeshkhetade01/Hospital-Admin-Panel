// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchDoctors } from '../../redux/slices/doctor/getDoctorSlice';
// import { toggleVerification } from '../../redux/slices/doctor/verifyDoctorSlice';
// import Table from '../../components/uiElement/Table';
// import Breadcrumbs from '../../components/uiElement/Breadcrumbs';

// const Doctor = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Selectors for Redux state
//   const { doctors, loading } = useSelector((state) => state.doctor);
//   const { updatingId } = useSelector((state) => state.verifyDoctor);

//   const breadcrumbPaths = [{ label: 'Doctors', link: '/doctors' }];

//   // Fetch doctors on component mount
//   useEffect(() => {
//     dispatch(fetchDoctors());
//   }, [dispatch]);

//   // Handle Verification Toggle
//   const handleToggle = async (id, currentStatus) => {
//     // Current status ka ulta (opposite) bhej rahe hain body mein
//     const targetStatus = !currentStatus;

//     const result = await dispatch(toggleVerification({ id, targetStatus }));
    
//     // Agar API successful ho jaye to list refresh karo
//     if (toggleVerification.fulfilled.match(result)) {
//       dispatch(fetchDoctors());
//     }
//   };

//   // Table Columns Setup
//   const columns = [
//     { 
//       header: 'Doctor', 
//       render: (row) => (
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
//             {row.user?.name?.charAt(0)}
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold text-gray-800">{row.user?.name}</span>
//             <span className="text-[11px] text-gray-500 font-medium">{row.user?.email}</span>
//           </div>
//         </div>
//       )
//     },
//     { header: 'Specialization', key: 'specialization' },
//     { 
//       header: 'Experience', 
//       render: (row) => <span className="font-medium text-gray-600">{row.experience} Yrs</span> 
//     },
//     { 
//       header: 'Fees', 
//       render: (row) => <span className="font-semibold text-gray-700">₹{row.fees}</span> 
//     },
//     { 
//       header: 'Rating', 
//       render: (row) => (
//         <div className="flex items-center gap-1">
//           <span className="text-yellow-400 text-lg">★</span>
//           <span className="font-bold text-gray-700">{row.rating || 0}</span>
//         </div>
//       )
//     },
//     {
//       header: 'Status',
//       render: (row) => {
//         const isCurrentlyUpdating = updatingId === row._id;
        
//         return (
//           <div className="flex items-center gap-4">
//             <label className={`relative inline-flex items-center ${isCurrentlyUpdating ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
//               <input 
//                 type="checkbox" 
//                 className="sr-only peer" 
//                 checked={row.isVerified} // Checked status backend value se sync hai
//                 onChange={() => !isCurrentlyUpdating && handleToggle(row._id, row.isVerified)}
//                 disabled={isCurrentlyUpdating} 
//               />
//               {/* Animated Toggle Switch */}
//               <div className="w-11 h-6 bg-gray-200 rounded-full peer 
//                 peer-focus:ring-2 peer-focus:ring-blue-100
//                 peer-checked:after:translate-x-full peer-checked:after:border-white 
//                 after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
//                 after:bg-white after:border-gray-300 after:border after:rounded-full 
//                 after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors">
//               </div>
//             </label>
            
//             {/* Professional Status Badge */}
//             <span className={`min-w-[90px] text-center text-[10px] tracking-widest font-extrabold px-3 py-1.5 rounded-lg border transition-all ${
//               isCurrentlyUpdating 
//                 ? 'bg-gray-50 text-gray-400 border-gray-200 animate-pulse'
//                 : row.isVerified 
//                   ? 'bg-green-50 text-green-700 border-green-200' 
//                   : 'bg-red-50 text-red-600 border-red-200'
//             }`}>
//               {isCurrentlyUpdating ? 'SAVING...' : (row.isVerified ? 'VERIFIED' : 'PENDING')}
//             </span>
//           </div>
//         );
//       }
//     }
//   ];

//   return (
//     <div className="p-5 bg-white border border-gray-200 min-h-screen">
//       {/* Top Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <Breadcrumbs items={breadcrumbPaths} />
//             <h1 className="text-xl font-bold text-gray-900 mt-2 tracking-tight">
//               Doctor Management
//             </h1>
//             <p className="text-gray-500 text-sm mt-1">Manage verification status and professional records.</p>
//           </div>
          
//           <button
//             onClick={() => navigate("/doctors/add-doctor")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl text-sm font-bold transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center gap-2 group"
//           >
//             <span className="text-xl group-hover:rotate-90 transition-transform">+</span> 
//             Add New Doctor
//           </button>
//         </div>

//         {/* Content Section */}
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
//           {loading && doctors.length === 0 ? (
//             <div className="text-center py-24 flex flex-col items-center gap-4">
//               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-gray-500 font-semibold tracking-wide">Fetching secure data...</p>
//             </div>
//           ) : (
//             <Table columns={columns} data={doctors} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctor;






import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../../redux/slices/doctor/getDoctorSlice';
import { toggleVerification } from '../../redux/slices/doctor/verifyDoctorSlice';
import { deleteDoctor } from '../../redux/slices/doctor/deletedoctorSlice'; 
import Table from '../../components/uiElement/Table';
import Breadcrumbs from '../../components/uiElement/Breadcrumbs';

const Doctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Selectors for Redux state
  const { doctors, loading } = useSelector((state) => state.doctor);
  const { updatingId } = useSelector((state) => state.verifyDoctor);
  const { deletingId } = useSelector((state) => state.deletedoctor); 

  const breadcrumbPaths = [{ label: 'Doctors', link: '/doctors' }];

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // Handle Verification Toggle
  const handleToggle = async (id, currentStatus) => {
    const targetStatus = !currentStatus;
    const result = await dispatch(toggleVerification({ id, targetStatus }));
    if (toggleVerification.fulfilled.match(result)) {
      dispatch(fetchDoctors());
    }
  };

  // Handle Delete Doctor
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      const result = await dispatch(deleteDoctor(id));
      if (deleteDoctor.fulfilled.match(result)) {
        dispatch(fetchDoctors()); // Refresh list after delete
      }
    }
  };

  const columns = [
    { 
      header: 'Doctor', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
            {row.user?.name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">{row.user?.name}</span>
            <span className="text-[11px] text-gray-500 font-medium">{row.user?.email}</span>
          </div>
        </div>
      )
    },
    { header: 'Specialization', key: 'specialization' },
    { 
      header: 'Experience', 
      render: (row) => <span className="font-medium text-gray-600">{row.experience} Yrs</span> 
    },
    { 
      header: 'Fees', 
      render: (row) => <span className="font-semibold text-gray-700">₹{row.fees}</span> 
    },
    { 
      header: 'Rating', 
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="font-bold text-gray-700">{row.rating || 0}</span>
        </div>
      )
    },
    {
      header: 'Status & Actions', // Updated Header
      render: (row) => {
        const isCurrentlyUpdating = updatingId === row._id;
        const isDeleting = deletingId === row._id;
        
        return (
          <div className="flex items-center gap-4">
            <label className={`relative inline-flex items-center ${isCurrentlyUpdating ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={row.isVerified} 
                onChange={() => !isCurrentlyUpdating && handleToggle(row._id, row.isVerified)}
                disabled={isCurrentlyUpdating} 
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
            </label>
            
            <span className={`min-w-[90px] text-center text-[10px] tracking-widest font-extrabold px-3 py-1.5 rounded-lg border transition-all ${
              isCurrentlyUpdating ? 'bg-gray-50 text-gray-400 border-gray-200 animate-pulse' : row.isVerified ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
            }`}>
              {isCurrentlyUpdating ? 'SAVING...' : (row.isVerified ? 'VERIFIED' : 'PENDING')}
            </span>

            {/* Trash (Delete) Button */}
            <button 
              onClick={() => handleDelete(row._id)}
              disabled={isDeleting}
              className={`p-2 rounded-lg transition-colors ${isDeleting ? 'bg-gray-100 text-gray-400' : 'hover:bg-red-50 text-red-500'}`}
              title="Delete Doctor"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="p-5 bg-white border border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Breadcrumbs items={breadcrumbPaths} />
            <h1 className="text-xl font-bold text-gray-900 mt-2 tracking-tight">Doctor Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage verification status and professional records.</p>
          </div>
          
          <button
            onClick={() => navigate("/doctors/add-doctor")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-bold transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center gap-2 group"
          >
            <span className="text-xl group-hover:rotate-90 transition-transform">+</span> 
            Add New Doctor
          </button>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          {loading && doctors.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-semibold tracking-wide">Fetching secure data...</p>
            </div>
          ) : (
            <Table columns={columns} data={doctors} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;