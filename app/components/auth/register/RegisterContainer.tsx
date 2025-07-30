import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RegisterContainerProps {
  children: ReactNode;
}

export default function RegisterContainer({ children }: RegisterContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 font-poppins">
      {children}
    </div>
  );
}
