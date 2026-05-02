import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addDoctor, resetState } from '../../redux/addDoctorSlice';
import { addDoctor,resetState } from '../../redux/slices/doctor/addDoctorSlice';
import Breadcrumbs from '../../components/uiElement/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { EyeOffIcon,EyeIcon, Eye } from 'lucide-react';

const AddDoctor = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.addDoctor);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    specialization: '', experience: '', fees: '',
    hospital: '', city: '', regNumber: '', about: ''
  });
const [showPassword, setShowPassword] = useState(false);
  const breadcrumbPaths = [
    { label: 'Doctors', link: '/doctors' },
    { label: 'Add Doctor', link: '/doctors/add' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(formData));
  };

  useEffect(() => {
    if (success) {
      setFormData({ /* Reset fields */ });
      dispatch(resetState());
      navigate("/doctors")
    }
  }, [success, dispatch]);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbPaths} />
      
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
{Object.keys(formData).map((key) => (
  <div key={key} className={`flex flex-col gap-1 ${key === 'about' ? 'md:col-span-2 lg:col-span-3' : ''}`}>
    <label className="text-sm font-semibold text-gray-700 capitalize">
      {key.replace(/([A-Z])/g, ' $1')}
    </label>

    {key === 'about' ? (
      <textarea
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32"
        placeholder={`Tell us about the doctor...`}
        required
      />
    ) : (
      <div className="relative flex items-center">
        <input
          // Password field ke liye type showPassword state par depend karega
          type={key === 'password' ? (showPassword ? 'text' : 'password') : (key === 'fees' || key === 'experience' ? 'number' : 'text')}
          name={key}
          autoComplete="new-password"
          value={formData[key]}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12"
          placeholder={`Enter ${key}`}
          required
        />
        
        {/* Sirf password field ke liye Eye button dikhao */}
        {key === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    )}
  </div>
))}
          </div>

          {error && <p className="mt-4 text-red-500 text-sm font-medium">⚠️ {error}</p>}

          <div className="mt-10 flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-10 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Register Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;