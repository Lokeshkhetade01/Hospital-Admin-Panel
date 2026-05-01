import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth/authSlice";
import dashboardReducer from "../redux/slices/dashboard/getDashboardStat"
import doctorReducer from "../redux/slices/doctor/getDoctorSlice"
import addDoctorReducer from "../redux/slices/doctor/addDoctorSlice"
import verifyDoctorReducer from "../redux/slices/doctor/verifyDoctorSlice"
import appointmentReducer from "../redux/slices/appointment/getAppointmentSlice"
import updateStatusReducer from "../redux/slices/appointment/updateStatusSlice"
import deletedoctorReducer from "../redux/slices/doctor/deletedoctorSlice"
import analyticsReducer from "../redux/slices/analytics/getAnalytics"
import userReducer from "../redux/slices/user/getUser"
import blockUserReducer from "../redux/slices/user/blockUserSlice"
import paymentReducer from "../redux/slices/payments/getPayment"
import appointmentByIdReducer from "../redux/slices/appointment/getAppointmentByIdSlice"
import faqReducer from "../redux/slices/faq/faqSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    doctor: doctorReducer,
    addDoctor: addDoctorReducer,
    verifyDoctor: verifyDoctorReducer,
    appointment: appointmentReducer,
    appointmentById: appointmentByIdReducer,
    updateStatus: updateStatusReducer,
    deletedoctor:deletedoctorReducer,
    analytics: analyticsReducer,
    users: userReducer,
    blockUser:blockUserReducer,
    payments: paymentReducer,
    faqs: faqReducer,
  },
});