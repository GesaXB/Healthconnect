'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { registerUser } from './action';

import RegisterContainer from 'app/components/auth/register/RegisterContainer';
import RegisterForm from 'app/components/auth/register/RegisterForm';
import RegisterIllustration from 'app/components/auth/register/RegisterIllustration';
import RegisterSuccess from 'app/components/auth/register/RegisterSuccess';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formComplete) {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formComplete, router]);

  const handleSubmit = async (formData: globalThis.FormData) => {
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      setFormComplete(true);
    } catch (err) {
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';

      if (err instanceof Error) {
        if (err.message.includes('Unique constraint failed on the fields: (`email`)')) {
          errorMessage = 'Email ini sudah terdaftar. Silakan gunakan email lain.';
        } else if (err.message.includes('password')) {
          errorMessage = 'Password harus minimal 8 karakter.';
        } else if (err.message.includes('email')) {
          errorMessage = 'Format email tidak valid. Mohon masukkan email yang benar.';
        }
      }

      setError(errorMessage);
      document.getElementById('form-container')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('form-container')?.classList.remove('animate-shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <AnimatePresence mode="wait">
        {formComplete ? (
          <RegisterSuccess />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl"
            id="form-container"
          >
            <RegisterIllustration />
            <RegisterForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </RegisterContainer>
  );
}
