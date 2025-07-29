'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { registerUser } from './action'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await registerUser(formData)
    setLoading(false)
    setFormComplete(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 font-poppins">
      <AnimatePresence mode="wait">
        {formComplete ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-gray-600 mb-6">Akun Anda telah berhasil dibuat.</p>
            <div className="space-y-3">
              <motion.a
                href="/auth/login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Masuk Sekarang
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-block w-full"
              >
                <Link href="/" className="inline-block w-full px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">
                  Kembali ke Beranda
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl"
          >
            {/* Illustration Section */}
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="lg:w-2/5 p-10 bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col justify-center items-center text-center relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 left-4"
              >
                <Link href="/" className="text-white hover:text-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8 w-full"
              >
                <img
                  src="https://cdn.storyset.com/medical/online-doctor-amico.svg"
                  alt="Medical Illustration"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white space-y-3"
              >
                <h1 className="text-2xl font-bold">Selamat Datang</h1>
                <p className="text-blue-100/90 text-sm leading-relaxed">
                  Bergabung dengan kami untuk pengalaman kesehatan yang lebih baik
                </p>
              </motion.div>
            </motion.div>

            {/* Form Section */}
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
                      required
                      className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      placeholder="Masukkan nama lengkap"
                    />
                  </motion.div>

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
                      required
                      className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      placeholder="contoh@email.com"
                    />
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
                      required
                      className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                      placeholder="••••••••"
                    />
                  </motion.div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
                  }}
                  whileTap={{
                    scale: 0.98,
                    boxShadow: "0 2px 6px rgba(59, 130, 246, 0.25)"
                  }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium text-white transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 shadow-md'}`}
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
                  ) : 'Daftar Sekarang'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
