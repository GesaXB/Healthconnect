import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface ForgotPasswordFormProps {
  onSubmit: (formData: globalThis.FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  submitted: boolean;
}

export default function ForgotPasswordForm({ onSubmit, loading, error, submitted }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('email', email);

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
        <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-10 space-y-1">
        <h2 className="text-3xl font-bold text-gray-800">
          Lupa <span className="text-blue-600">Password?</span>
        </h2>
        <p className="text-gray-500 text-sm">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset password
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
            <div className="font-medium text-sm">Gagal Mengirim</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        </motion.div>
      )}

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Email Terkirim!</h3>
            <p className="text-green-600 text-sm">
              Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/login"
                className="inline-block w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
              >
                Kembali ke Login
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Kirim Ulang Email
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
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
                value={email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                placeholder="contoh@email.com"
              />
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
                Mengirim...
              </motion.span>
            ) : (
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kirim Link Reset
              </motion.span>
            )}
          </motion.button>

          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Login
            </Link>
          </motion.div>
        </form>
      )}
    </motion.div>
  );
}
