
import { useState } from 'react';
import { User, UserRound, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface UserTypeProps {
  onSelect: (type: 'patient' | 'doctor' | 'admin') => void;
  selectedType: 'patient' | 'doctor' | 'admin' | null;
}

const UserTypeSelector = ({ onSelect, selectedType }: UserTypeProps) => {
  const userTypes = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'doctor', label: 'Doctor', icon: UserRound },
    { id: 'admin', label: 'Admin', icon: UserCog },
  ] as const;

  return (
    <div className="flex w-full rounded-full bg-gray-100 p-1 transition-all duration-300 ease-in-out">
      {userTypes.map((type) => {
        const isSelected = selectedType === type.id;
        const Icon = type.icon;
        
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              "relative flex-1 flex items-center justify-center py-2 px-3 rounded-full transition-all duration-300",
              "text-sm font-medium text-gray-600",
              isSelected && "text-hospitrax-600 font-semibold"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-1.5 z-10">
              <Icon className="h-4 w-4" />
              {type.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default UserTypeSelector;
