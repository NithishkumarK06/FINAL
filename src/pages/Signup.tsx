
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SignupForm from '@/components/auth/SignupForm';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  
  const handleSignup = (userData: {
    userType: 'patient' | 'doctor' | 'admin';
    name: string;
    email: string;
    phone: string;
    aadhaarNumber?: string;
    password?: string;
  }) => {
    // In a real app, this would call an API
    console.log('Signup attempt:', userData);
    
    // For demo, we'll just accept any signup
    localStorage.setItem('userType', userData.userType);
    localStorage.setItem('isLoggedIn', 'true');
    
    toast({
      title: "Account created successfully",
      description: `Welcome to HOSPITRAX Health Cloud!`,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hospitrax-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Logo />
            </motion.div>
          </div>
          
          <SignupForm onSignup={handleSignup} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
