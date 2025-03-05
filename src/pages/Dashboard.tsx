
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/dashboard/SearchBar';
import SpecialtyFilter from '@/components/dashboard/SpecialtyFilter';
import HospitalCard, { Hospital } from '@/components/dashboard/HospitalCard';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const navigate = useNavigate();
  
  // Mock hospitals data
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'Rajiv Gandhi Government General Hospital',
      location: 'Chennai',
      state: 'Tamil Nadu',
      phone: '044-2530 5000',
      specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Surgery']
    },
    {
      id: '2',
      name: 'Government Medical College Hospital',
      location: 'Coimbatore',
      state: 'Tamil Nadu',
      phone: '0422-2301393',
      specialties: ['Cardiology', 'Gynecology', 'Oncology', 'Dermatology', 'ENT']
    },
    {
      id: '3',
      name: 'Government Mohan Kumaramangalam Medical College Hospital',
      location: 'Salem',
      state: 'Tamil Nadu',
      phone: '0427-2311542',
      specialties: ['Nephrology', 'Pulmonology', 'Orthopedics', 'General Medicine', 'Pediatrics']
    },
    {
      id: '4',
      name: 'Madurai Medical College and Government Rajaji Hospital',
      location: 'Madurai',
      state: 'Tamil Nadu',
      phone: '0452-2532535',
      specialties: ['Neurosurgery', 'Cardiothoracic Surgery', 'Urology', 'Ophthalmology', 'Psychiatry']
    },
    {
      id: '5',
      name: 'Tirunelveli Medical College Hospital',
      location: 'Tirunelveli',
      state: 'Tamil Nadu',
      phone: '0462-2572733',
      specialties: ['Pediatrics', 'Orthopedics', 'Dermatology', 'ENT', 'General Medicine']
    }
  ]);
  
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
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };
  
  const handleBookAppointment = (hospitalId: string) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    if (hospital) {
      toast({
        title: "Appointment Request",
        description: `Redirecting to appointment booking for ${hospital.name}`,
      });
      // In a real app, we would navigate to an appointment booking page
    }
  };
  
  // Filter hospitals based on search query and selected specialty
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesQuery = searchQuery === '' || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
      hospital.specialties.includes(selectedSpecialty);
    
    return matchesQuery && matchesSpecialty;
  });
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        userType={userType}
        userName={userType === 'patient' ? 'John Doe' : 'Dr. John Doe'}
        userRole={userType === 'patient' ? 'Patient' : 'Doctor'}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto pb-10">
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Hospitals & Specialists</h1>
          
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="mb-8">
            <SpecialtyFilter onFilterChange={handleSpecialtyFilter} />
          </div>
          
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard 
                  key={hospital.id} 
                  hospital={hospital} 
                  onBookAppointment={handleBookAppointment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">No hospitals found matching your criteria</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('All Specialties');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
