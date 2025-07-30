import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ResetPasswordIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="w-full md:w-1/2 p-10 bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col justify-center items-center text-center relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 hidden md:block"
      >
        <Link href="/" className="text-white hover:text-blue-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
          src="https://cdn.storyset.com/illustration/secure-login/amico.svg"
          alt="Reset password illustration"
          className="w-full h-auto max-h-72 object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white space-y-3"
      >
        <h1 className="text-2xl font-bold">Buat Password Baru</h1>
        <p className="text-blue-100/90 text-sm leading-relaxed">
          Buat password yang kuat untuk melindungi akun Anda dari ancaman keamanan
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Password terenkripsi dengan aman
          </div>
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Kombinasi huruf, angka & simbol
          </div>
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Aktivasi otomatis setelah reset
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips Keamanan
          </h3>
          <ul className="text-xs space-y-1 text-blue-100/70">
            <li>• Gunakan minimal 8 karakter</li>
            <li>• Kombinasikan huruf besar & kecil</li>
            <li>• Sertakan angka dan simbol</li>
            <li>• Hindari informasi pribadi</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
