import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

const ROLES = ['Admin', 'Nurse', 'Billing', 'Viewer'];

export default function Register() {
  const [form,     setForm]     = useState({ name: '', email: '', role: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
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
    if (!form.name.trim())     e.name     = 'Name required';
    if (!form.email.trim()) {
      e.email    = 'Email required';
    } else if (!emailRegex.test(form.email)) {
      e.email    = 'Invalid email format';
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
          <h1 className="text-2xl font-bold text-blue-600 mb-3">Create Account</h1>

          {/* Social icons */}
          <div className="flex items-center gap-4 mb-3">
            {/* Google */}
            <button type="button" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            {/* Facebook */}
            <button type="button" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            {/* Instagram */}
            <button type="button" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="url(#ig)">
                <defs>
                  <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/>
                    <stop offset="25%" stopColor="#e6683c"/>
                    <stop offset="50%" stopColor="#dc2743"/>
                    <stop offset="75%" stopColor="#cc2366"/>
                    <stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-xs mb-4">or use your email for registration</p>

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
                className={inputCls(errors.email)} autoComplete="email"/>
              {errors.email && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.email}</p>}
            </div>
            <select name="role" value={form.role} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#dbeafe] text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              <option value="">Select Role</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="relative">
              <input name="password" type={showPass ? 'text' : 'password'} placeholder="Password"
                value={form.password} onChange={handleChange}
                className={inputCls(errors.password)} autoComplete="new-password"/>
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
              {errors.password && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-50 mt-1">
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
