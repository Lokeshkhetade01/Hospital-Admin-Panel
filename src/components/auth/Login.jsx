import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/slices/auth/authSlice"; 
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux State
  const { loading, token, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid professional email";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

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
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-blue-600"></div>
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 text-blue-600">
              <ShieldCheck size={38} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
              Medicare<span className="text-blue-600">+</span> <span className="font-light text-slate-500">Admin</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">Please sign in to your control panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider ml-1">Admin Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  autoComplete="new-email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@medicareplus.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-slate-700 transition-all outline-none focus:bg-white focus:ring-4 ${
                    errors.email || error ? "border-red-200 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 tracking-wider">Password</label>
                <button type="button" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">FORGOT KEY?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-2xl text-slate-700 transition-all outline-none focus:bg-white focus:ring-4 ${
                    errors.password || error ? "border-red-200 focus:ring-red-50" : "border-slate-200 focus:ring-blue-50 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.password}</p>}
            </div>

            {/* API Backend Error Display */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-100 text-center uppercase tracking-tighter">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.97] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verifying Access...
                </>
              ) : (
                "Authorize Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;