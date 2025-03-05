
import { MapPin, Phone, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Hospital {
  id: string;
  name: string;
  location: string;
  state: string;
  phone: string;
  specialties: string[];
}

interface HospitalCardProps {
  hospital: Hospital;
  onBookAppointment: (hospitalId: string) => void;
}

const HospitalCard = ({ hospital, onBookAppointment }: HospitalCardProps) => {
  return (
    <div className="glass-card glass-card-hover rounded-xl overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-hospitrax-800 mb-1">{hospital.name}</h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{hospital.location}, {hospital.state}</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-600 mb-6">
          <Phone className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{hospital.phone}</span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Available Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty) => (
              <Badge 
                key={specialty} 
                variant="outline"
                className={cn(
                  "bg-hospitrax-50 text-hospitrax-700 hover:bg-hospitrax-100 border-hospitrax-200",
                  "text-xs py-0.5"
                )}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            size="sm" 
            className="text-hospitrax-600 border-hospitrax-200 hover:bg-hospitrax-50"
          >
            <MapIcon className="h-3.5 w-3.5 mr-1.5" />
            View on Map
          </Button>
          
          <Button 
            size="sm"
            onClick={() => onBookAppointment(hospital.id)}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
