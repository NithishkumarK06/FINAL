
import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SpecialtyFilterProps {
  onFilterChange: (specialty: string) => void;
}

const SpecialtyFilter = ({ onFilterChange }: SpecialtyFilterProps) => {
  const [specialties, setSpecialties] = useState<string[]>([
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'ENT',
    'Gastroenterology',
    'General Medicine',
    'General Surgery',
    'Gynecology',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Urology'
  ]);

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-700 mb-2">Filter by Specialty</p>
      <Select onValueChange={onFilterChange} defaultValue="All Specialties">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Specialties" />
        </SelectTrigger>
        <SelectContent>
          {specialties.map((specialty) => (
            <SelectItem key={specialty} value={specialty}>
              {specialty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpecialtyFilter;
