import { ReactNode } from 'react';

interface ResetPasswordContainerProps {
  children: ReactNode;
}

export default function ResetPasswordContainer({ children }: ResetPasswordContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 font-poppins">
      {children}
    </div>
  );
}
