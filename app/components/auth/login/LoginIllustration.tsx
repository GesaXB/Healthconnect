import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="w-full md:w-1/2 p-10 bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col justify-center items-center text-center relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 hidden md:block"
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
          src="https://cdn.storyset.com/illustration/chat-bot/amico.svg"
          alt="Chatbot illustration"
          className="w-full h-auto max-h-72 object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white space-y-3"
      >
        <h1 className="text-2xl font-bold">Login ke Akun Anda</h1>
        <p className="text-blue-100/90 text-sm leading-relaxed">
          Akses semua fitur dengan masuk ke akun Anda
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Dashboard personal yang informatif
          </div>
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Konsultasi dengan dokter terpercaya
          </div>
          <div className="flex items-center text-blue-100/80 text-sm">
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Riwayat kesehatan terintegrasi
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
