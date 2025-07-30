import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { checkEmailAvailability } from 'app/auth/register/action';

interface RegisterFormProps {
  onSubmit: (formData: globalThis.FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm({ onSubmit, loading, error }: RegisterFormProps) {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: ''
  });

  const checkEmail = useCallback(async (email: string) => {
    if (!email || email.length < 5) {
      setEmailError(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      return;
    }

    setIsCheckingEmail(true);
    try {
      const isAvailable = await checkEmailAvailability(email);
      if (!isAvailable) {
        setEmailError('Email ini sudah terdaftar');
      } else {
        setEmailError(null);
      }
    } catch (err) {
      console.error('Gagal memeriksa email:', err);
      setEmailError(null);
    } finally {
      setIsCheckingEmail(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email) {
        checkEmail(formData.email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, checkEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email' && emailError) setEmailError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError) {
      document.getElementById('form-container')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('form-container')?.classList.remove('animate-shake');
      }, 500);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);

    await onSubmit(formDataObj);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="lg:w-3/5 p-10 lg:p-12"
    >
      <motion.div variants={itemVariants} className="mb-10 space-y-1">
        <h2 className="text-3xl font-bold text-gray-800">
          Buat Akun Pasien
        </h2>
        <p className="text-gray-500 text-sm">
          Sudah punya akun?{' '}
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Masuk disini
          </a>
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={containerVariants} className="space-y-5">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
              }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="Masukkan nama lengkap"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <motion.input
                whileFocus={{
                  scale: 1.01,
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 text-gray-700 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400`}
                placeholder="contoh@email.com"
              />
              {isCheckingEmail && (
                <div className="absolute right-3 top-3.5">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {emailError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm mt-1 flex items-start"
              >
                <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {emailError}
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <motion.input
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
              }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: formData.password ? 1 : 0 }}
              className="text-xs text-gray-500 mt-1"
            >
              Minimal 8 karakter
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{
            scale: loading ? 1 : 1.02,
            boxShadow: loading ? "none" : "0 4px 12px rgba(59, 130, 246, 0.25)"
          }}
          whileTap={{
            scale: loading ? 1 : 0.98,
            boxShadow: loading ? "none" : "0 2px 6px rgba(59, 130, 246, 0.25)"
          }}
          type="submit"
          disabled={loading || emailError !== null}
          className={`w-full py-3.5 px-4 rounded-xl font-medium text-white transition-all ${loading || emailError ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 shadow-md hover:bg-blue-700'}`}
        >
          {loading ? (
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center justify-center gap-2"
            >
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </motion.span>
          ) : (
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Daftar Sekarang
            </motion.span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
