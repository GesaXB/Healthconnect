'use client';

import Link from 'next/link';

export default function Footer() {
  return (
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
  );
}
