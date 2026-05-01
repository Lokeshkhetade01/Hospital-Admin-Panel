import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './components/auth/Login';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Doctor from './pages/doctor/Doctor';
import AddDoctors from './pages/doctor/AddDoctors';
import Appointment from './pages/appointment/Appointment';
import Analytics from './pages/analytics/Analytics';
import Users from './pages/user/Users';
import Payment from './pages/payment/Payment';
import AppointmentDetails from './pages/appointment/AppointmentDetails';
import Faq from './pages/faq/Faq';
function App() {
  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
        transition={Slide}
        toastClassName="rounded-xl shadow-lg"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-gradient-to-r from-green-400 to-blue-500"
      />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />

        <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/doctors' element={<Doctor/>} />
          <Route path='/doctors/add-doctor' element={<AddDoctors/>} />
          <Route path='/appointments' element={<Appointment/>} />
          <Route path='/appointments/:id' element={<AppointmentDetails/>} />
          <Route path='/analytics' element={<Analytics/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/payments' element={<Payment/>} />
          <Route path='/faq' element={<Faq/>} /></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </>
  );
}

export default App;