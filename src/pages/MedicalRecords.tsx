
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const MedicalRecords = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType') as 'patient' | 'doctor' | 'admin' || 'patient';
    
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    setUserType(storedUserType);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        userType={userType}
        userName={userType === 'patient' ? 'John Doe' : 'Dr. John Doe'}
        userRole={userType === 'patient' ? 'Patient' : 'Doctor'}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Medical Records</h1>
          
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-800">Your Medical Records</h2>
              <p className="text-gray-600 max-w-md">Your medical history is private and secure. Authorized healthcare providers can view your records when needed for treatment.</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MedicalRecords;
