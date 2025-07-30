'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendResetEmail } from './action';

import ForgotPasswordContainer from 'app/components/auth/forgot-password/ForgotPasswordContainer';
import ForgotPasswordForm from 'app/components/auth/forgot-password/ForgotPasswordForm';
import ForgotPasswordIllustration from 'app/components/auth/forgot-password/ForgotPasswordIllustration';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: globalThis.FormData) => {
    setLoading(true);
    setError(null);

    try {
      await sendResetEmail(formData);
      setSubmitted(true);
    } catch (err) {
      let errorMessage = 'Terjadi kesalahan saat mengirim email reset. Silakan coba lagi.';

      if (err instanceof Error) {
        if (err.message.includes('User not found') || err.message.includes('Email not found')) {
          errorMessage = 'Email tidak ditemukan. Pastikan Anda memasukkan email yang benar.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Koneksi bermasalah. Periksa koneksi internet Anda dan coba lagi.';
        } else if (err.message.includes('rate limit') || err.message.includes('too many')) {
          errorMessage = 'Terlalu banyak permintaan. Silakan tunggu beberapa menit sebelum mencoba lagi.';
        } else if (err.message.includes('email')) {
          errorMessage = 'Format email tidak valid. Mohon masukkan email yang benar.';
        }
      }

      setError(errorMessage);

      document.getElementById('forgot-password-form-container')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('forgot-password-form-container')?.classList.remove('animate-shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col-reverse md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl"
        id="forgot-password-form-container"
      >
        <ForgotPasswordForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitted={submitted}
        />
        <ForgotPasswordIllustration />
      </motion.div>
    </ForgotPasswordContainer>
  );
}
