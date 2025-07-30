'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  containerVariants: any;
  itemVariants: any;
}

export default function HeroSection({ containerVariants, itemVariants }: HeroSectionProps) {
  return (
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/register"
              className="block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg text-center"
            >
              Mulai Sekarang
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#features"
              className="block px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-xl font-medium hover:bg-blue-50 transition-colors text-center"
            >
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="lg:w-1/2">
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
  );
}
