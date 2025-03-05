
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Appointments = () => {
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>
          
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-lg text-gray-600">You have no upcoming appointments.</p>
            </div>
            
            <Button size="lg" className="mt-2 gap-2">
              <CalendarPlus size={18} />
              Book New Appointment
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
