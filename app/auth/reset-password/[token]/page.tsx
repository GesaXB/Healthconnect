'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '../action';

import ResetPasswordContainer from 'app/components/auth/reset-password/ResetPasswordContainer';
import ResetPasswordForm from 'app/components/auth/reset-password/ResetPasswordForm';
import ResetPasswordIllustration from 'app/components/auth/reset-password/ResetPasswordIllustration';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: globalThis.FormData) => {
    setLoading(true);
    setError(null);

    try {
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        setError('Password dan konfirmasi password tidak cocok.');
        return;
      }

      if (password.length < 8) {
        setError('Password harus memiliki minimal 8 karakter.');
        return;
      }

      const result = await resetPassword(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);

        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (err) {
      let errorMessage = 'Terjadi kesalahan saat mereset password. Silakan coba lagi.';

      if (err instanceof Error) {
        if (err.message.includes('Invalid token') || err.message.includes('Token expired')) {
          errorMessage = 'Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru.';
        } else if (err.message.includes('Token not found')) {
          errorMessage = 'Link reset password tidak ditemukan. Pastikan Anda menggunakan link yang benar.';
        } else if (err.message.includes('Password too weak')) {
          errorMessage = 'Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Koneksi bermasalah. Periksa koneksi internet Anda dan coba lagi.';
        }
      }

      setError(errorMessage);

      document.getElementById('reset-password-form-container')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('reset-password-form-container')?.classList.remove('animate-shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col-reverse md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl"
        id="reset-password-form-container"
      >
        <ResetPasswordForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          success={success}
          token={params.token}
        />
        <ResetPasswordIllustration />
      </motion.div>
    </ResetPasswordContainer>
  );
}
