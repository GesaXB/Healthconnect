'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { loginUser } from './action';

import LoginContainer from 'app/components/auth/login/LoginContainer';
import LoginForm from 'app/components/auth/login/LoginForm';
import LoginIllustration from 'app/components/auth/login/LoginIllustration';
import LoginSuccess from 'app/components/auth/login/LoginSuccess';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleSubmit = async (formData: globalThis.FormData) => {
    setLoading(true);
    setError(null);

    try {
      const email = formData.get('email') as string;

      await loginUser(formData);

      const name = email.split('@')[0];
      setUserName(name);
      setLoginSuccess(true);
    } catch (err) {
      let errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.';

      if (err instanceof Error) {
        if (err.message.includes('Invalid credentials') || err.message.includes('Unauthorized')) {
          errorMessage = 'Email atau password salah. Periksa kembali data login Anda.';
        } else if (err.message.includes('User not found')) {
          errorMessage = 'Akun dengan email ini tidak ditemukan. Pastikan Anda sudah mendaftar.';
        } else if (err.message.includes('Account locked')) {
          errorMessage = 'Akun Anda terkunci karena terlalu banyak percobaan login yang gagal.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Koneksi bermasalah. Periksa koneksi internet Anda dan coba lagi.';
        } else if (err.message.includes('email')) {
          errorMessage = 'Format email tidak valid. Mohon masukkan email yang benar.';
        }
      }

      setError(errorMessage);

      document.getElementById('login-form-container')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('login-form-container')?.classList.remove('animate-shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <AnimatePresence mode="wait">
        {loginSuccess ? (
          <LoginSuccess userName={userName} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col-reverse md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl"
            id="login-form-container"
          >
            <LoginForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
            <LoginIllustration />
          </motion.div>
        )}
      </AnimatePresence>
    </LoginContainer>
  );
}
