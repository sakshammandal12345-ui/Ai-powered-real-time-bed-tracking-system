import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

const ROLES = ['Admin', 'Hospital Staff'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', role: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));
  }

  function validate() {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim()) {
      e.email = 'Email required';
    } else if (!emailRegex.test(form.email)) {
      e.email = 'Invalid email format';
    }
    if (!form.role) {
      e.role = 'Role required';
    }
    if (!form.password.trim()) {
      e.password = 'Password required';
    } else if (form.password.length < 6) {
      e.password = 'Password must be at least 6 characters';
    }
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    try {
      setLoading(true);
      await register(form.name.trim(), form.email.trim(), form.role || 'Admin', form.password);
      navigate('/login');
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = (err) =>
    `w-full px-4 py-3 rounded-lg bg-[#dbeafe] text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${err ? 'ring-2 ring-red-400' : ''}`;

  return (
    <div className="min-h-screen bg-[#5fa8f5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row">

        {/* ── Left: Info (blue) ── */}
        <div className="w-full sm:w-1/2 bg-[#4a9ff5] p-8 sm:p-10 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl font-extrabold mb-4 leading-snug">Create Your Account!</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-xs">
            Join us today and explore all the features we have to offer.
          </p>
          <Link to="/login">
            <button className="px-8 py-3 rounded-full border-2 border-white text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-blue-500 transition-all">
              SIGN IN
            </button>
          </Link>
        </div>

        {/* ── Right: Form (white) ── */}
        <div className="w-full sm:w-1/2 bg-white p-8 sm:p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-6">Create Account</h1>

          {/* Social Icons Placeholder — Design match */}
          <div className="flex gap-4 mb-6">
            <button type="button" className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: '#DB4437' }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: '#34A853' }} />
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" style={{ fill: '#FBBC05' }} />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{ fill: '#EA4335' }} />
              </svg>
            </button>
            <button type="button" className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" style={{ fill: '#1877F2' }} viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button type="button" className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" style={{ fill: '#E4405F' }} viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.887 5.887 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.89 5.89 0 002.126-1.384 5.886 5.886 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.89 5.89 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.054 1.805.249 2.227.412.558.216.957.475 1.376.894.419.419.678.818.894 1.376.163.422.358 1.057.412 2.227.055 1.265.07 1.647.07 4.85s-.015 3.585-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.558-.475.957-.894 1.376-.419.419-.818.678-1.376.894-.422.163-1.057.358-2.227.412-1.265.055-1.647.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.054-1.805-.249-2.227-.412a3.486 3.486 0 01-1.376-.894 3.481 3.481 0 01-.894-1.376c-.163-.422-.358-1.057-.412-2.227-.055-1.265-.07-1.647-.07-4.85s.015-3.585.07-4.85c.054-1.17.249-1.805.412-2.227.216-.558.475-.957.894-1.376.419-.419.818-.678 1.376-.894.422-.163 1.057-.358 2.227-.412 1.265-.055 1.647-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-xs mt-1 mb-5">or use your email for registration</p>

          {errors.form && (
            <div className="w-full flex items-center gap-2 mb-3 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              <ShieldAlert size={14} className="shrink-0" /> {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
            <div>
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
                className={inputCls(errors.name)} autoComplete="name" />
              {errors.name && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.name}</p>}
            </div>
            <div>
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
                className={inputCls(errors.email)} autoComplete="email" />
              {errors.email && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.email}</p>}
            </div>
            <div>
              <select name="role" value={form.role} onChange={handleChange}
                className={inputCls(errors.role)}
              >
                <option value="">Select Role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.role}</p>}
            </div>
            <div className="relative">
              <input name="password" type={showPass ? 'text' : 'password'} placeholder="Password"
                value={form.password} onChange={handleChange}
                className={inputCls(errors.password)} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
              {errors.password && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-50 mt-2">
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
