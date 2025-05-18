import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './utils';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      if (res.status === 200) {
        navigate('/');
      } else {
        setErrorMessage('Gagal login. Periksa kembali email dan password Anda.');
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 'Terjadi kesalahan saat login. Silakan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-one-third">
        <div className="box has-background-dark">
          <h1 className="title has-text-centered has-text-light">Masuk ke Daily Notes</h1>
          <p className="has-text-centered has-text-grey-light mb-4">Silakan masuk untuk mengelola catatan Anda</p>

          {errorMessage && (
            <div className="notification is-danger is-light">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="field">
              <label className="label has-text-light">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label has-text-light">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            <div className="field mt-4">
              <div className="control">
                <button
                  type="submit"
                  className={`button is-link is-fullwidth ${isLoading ? 'is-loading' : ''}`}
                  disabled={isLoading}
                >
                  Masuk
                </button>
              </div>
            </div>
          </form>

          <p className="has-text-centered has-text-grey-light mt-4">
            Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
