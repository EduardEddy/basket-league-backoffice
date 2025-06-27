import React, { useState } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    const auth = await dispatch(loginUser(loginData));
    console.log('auth', auth?.payload?.success);
    console.log('user', user);
    return window.location.href = '/users';
    //return navigate('/users');
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card login-card">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="login-avatar">
                    <User size={32} color="white" />
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Bienvenido</h2>
                  <p className="text-muted">Inicia sesión en tu dashboard</p>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium text-dark">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-custom"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium text-dark">Contraseña</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-custom"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    //onLogin(loginData);
                    handleLogin();
                  }}
                  className="btn btn-primary btn-login w-100 text-white mb-4"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
                {error && <div className="text-danger text-center">{error}</div>}

                <div className="text-center">
                  <small className="text-muted">
                    Demo: Usa cualquier email y contraseña
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 