// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin } from "../../redux/slices/auth/authSlice"; 
// import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Redux State
//   const { loading, token, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [token, navigate]);

//   const validate = () => {
//     let tempErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email) {
//       tempErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       tempErrors.email = "Enter a valid professional email";
//     }

//     if (!formData.password) {
//       tempErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       tempErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       dispatch(loginAdmin(formData));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
//       <div className="fixed top-0 left-0 w-full h-1.5 bg-blue-600"></div>
      
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
//         <div className="p-8 md:p-10">
          
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 text-blue-600">
//               <ShieldCheck size={38} strokeWidth={2.5} />
//             </div>
//             <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
//               Medicare<span className="text-blue-600">+</span> <span className="font-light text-slate-500">Admin</span>
//             </h2>
//             <p className="text-slate-400 text-sm mt-2 font-medium">Please sign in to your control panel</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-xs font-bold text-slate-500 tracking-wider ml-1">Admin Email</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600">
//                   <Mail size={18} />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="new-email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="admin@medicareplus.com"
//                   className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-slate-700 transition-all outline-none focus:bg-white focus:ring-4 ${
//                     errors.email || error ? "border-red-200 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
//                   }`}
//                 />
//               </div>
//               {errors.email && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.email}</p>}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-center px-1">
//                 <label className="text-xs font-bold text-slate-500 tracking-wider">Password</label>
//                 <button type="button" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">FORGOT KEY?</button>
//               </div>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600">
//                   <Lock size={18} />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   autoComplete="new-password"
//                   placeholder="••••••••"
//                   className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-2xl text-slate-700 transition-all outline-none focus:bg-white focus:ring-4 ${
//                     errors.password || error ? "border-red-200 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.password}</p>}
//             </div>

//             {/* API Backend Error Display */}
//             {error && (
//               <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-100 text-center uppercase tracking-tighter">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.97] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={20} />
//                   Verifying Access...
//                 </>
//               ) : (
//                 "Authorize Login"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/slices/auth/authSlice"; 
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight, Moon, Sun } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, token, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Enter a valid professional email";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Min 6 characters required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginAdmin(formData));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-[120px]"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-blue-900/40 rotate-3 transition-transform hover:rotate-0 duration-500">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            MediCare<span className="text-blue-600">+</span>
          </h1>
          <div className="h-1.5 w-10 bg-blue-600 rounded-full mt-1"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-slate-800 p-8 md:p-10 relative overflow-hidden">
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Admin Portal</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Authorized access only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase tracking-widest">Identify Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@medicare.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border rounded-2xl text-slate-700 dark:text-slate-200 transition-all outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-4 ${
                    errors.email || error ? "border-red-200 dark:border-red-900/50 focus:ring-red-50 dark:focus:ring-red-900/10" : "border-slate-100 dark:border-slate-700 focus:ring-blue-50 dark:focus:ring-blue-900/20 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] font-semibold text-red-500 ml-2 italic">*{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase tracking-widest">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border rounded-2xl text-slate-700 dark:text-slate-200 transition-all outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-4 ${
                    errors.password || error ? "border-red-200 dark:border-red-900/50 focus:ring-red-50 dark:focus:ring-red-900/10" : "border-slate-100 dark:border-slate-700 focus:ring-blue-50 dark:focus:ring-blue-900/20 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] font-semibold text-red-500 ml-2 italic">*{errors.password}</p>}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-[11px] font-bold border border-red-100 dark:border-red-900/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                {error.toUpperCase()}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 group overflow-hidden relative"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Login</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;