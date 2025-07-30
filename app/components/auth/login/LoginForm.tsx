import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react'
import Link from 'next/link';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (formData: globalThis.FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();
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
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full md:w-1/2 p-10 lg:p-12 relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 left-4 md:hidden"
      >
        <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-10 space-y-1">
        <h2 className="text-3xl font-bold text-gray-800">
          Selamat <span className="text-blue-600">Datang</span>
        </h2>
        <p className="text-gray-500 text-sm">
          Belum punya akun?{' '}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Daftar disini
          </Link>
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start"
        >
          <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-medium text-sm">Login Gagal</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={containerVariants} className="space-y-5">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="contoh@email.com"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
              >
                Lupa password?
              </Link>
            </div>
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
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Ingat saya
          </label>
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
          disabled={loading}
          className={`w-full py-3.5 px-4 rounded-xl font-medium text-white transition-all ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 shadow-md hover:bg-blue-700'
          }`}
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
              Masuk Sekarang
            </motion.span>
          )}
        </motion.button>
      </form>

      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <div className="text-center">
          <span className="text-sm text-gray-500">Atau masuk dengan</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <motion.button
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Google</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
