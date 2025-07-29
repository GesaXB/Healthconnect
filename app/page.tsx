'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-poppins">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-xl font-bold text-blue-800">HealthCare</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4"
        >
          <Link href="/auth/login" className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Masuk
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            Daftar
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        <motion.div variants={itemVariants} className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Solusi Kesehatan <span className="text-blue-600">Digital</span> untuk Anda
          </h1>
          <p className="text-lg text-gray-600">
            Akses layanan kesehatan berkualitas kapan saja, di mana saja. Konsultasi dengan dokter profesional secara online dengan mudah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/register"
                className="block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg text-center"
              >
                Mulai Sekarang
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#features"
                className="block px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-xl font-medium hover:bg-blue-50 transition-colors text-center"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="lg:w-1/2"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="https://cdn.storyset.com/medical/online-doctor-pana.svg"
              alt="Doctor consultation illustration"
              width={600}
              height={500}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kenapa Memilih Kami?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Layanan kesehatan digital terintegrasi untuk kebutuhan medis Anda</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                title: 'Konsultasi Cepat',
                desc: 'Dokter siap membantu 24/7 melalui platform kami'
              },
              {
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                title: 'Rekam Medis Digital',
                desc: 'Akses riwayat kesehatan Anda kapan saja'
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Terjangkau',
                desc: 'Layanan berkualitas dengan harga terjangkau'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Siap Memulai Perjalanan Kesehatan Anda?</h2>
            <p className="text-blue-100 mb-8">Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan layanan kesehatan digital kami.</p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/auth/register"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Daftar Sekarang - Gratis!
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-lg font-bold text-blue-800">HealthCare</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Syarat & Ketentuan</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Kontak</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HealthCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
