import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const { login } = useAuth();
  const navigate  = useNavigate();

  function validate() {
    const e = {};
    if (!email.trim())    e.email    = 'Email required';
    if (!password.trim()) e.password = 'Password required';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch {
      setErrors({ form: 'Invalid credentials. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = (err) =>
    `w-full px-4 py-3 rounded-lg bg-[#dbeafe] text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${err ? 'ring-2 ring-red-400' : ''}`;

  return (
    <div className="min-h-screen bg-[#5fa8f5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row">

        {/* ── Left: Form (white) ── */}
        <div className="w-full sm:w-1/2 bg-white p-8 sm:p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-1">Sign In</h1>

          {errors.form && (
            <div className="w-full flex items-center gap-2 mt-3 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              <ShieldAlert size={14} className="shrink-0" /> {errors.form}
            </div>
          )}

          <p className="text-gray-500 text-xs mt-4 mb-5">or use your email password</p>

          <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
            {/* Name / username placeholder — UI only per Figma */}
            <input
              type="text"
              placeholder="Name"
              className={inputCls(false)}
              readOnly
              tabIndex={-1}
            />

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                className={inputCls(errors.email)}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                className={inputCls(errors.password)}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
              {errors.password && <p className="text-red-500 text-[11px] mt-0.5 pl-1">{errors.password}</p>}
            </div>

            <p className="text-center text-sm text-gray-600 font-medium pt-1">
              <a href="#" className="hover:text-blue-600 transition-colors">Forget Your Password ?</a>
            </p>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-md disabled:opacity-50">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* ── Right: Welcome (blue) ── */}
        <div className="w-full sm:w-1/2 bg-[#4a9ff5] p-8 sm:p-10 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl font-extrabold mb-4 leading-snug">Welcome Back</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-xs">
            Sign in to access your account and continue where you left off.
          </p>
          <Link to="/register">
            <button className="px-8 py-3 rounded-full border-2 border-white text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-blue-500 transition-all">
              SIGN UP
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
