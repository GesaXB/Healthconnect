import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterIllustration() {
  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="lg:w-2/5 p-10 bg-gradient-to-br from-blue-400 to-blue-600 flex-col justify-center items-center text-center relative hidden lg:flex"
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
  );
}
