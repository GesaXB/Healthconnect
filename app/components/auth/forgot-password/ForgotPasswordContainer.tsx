import { ReactNode } from 'react';

interface ForgotPasswordContainerProps {
  children: ReactNode;
}

export default function ForgotPasswordContainer({ children }: ForgotPasswordContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 font-poppins">
      {children}
    </div>
  );
}
