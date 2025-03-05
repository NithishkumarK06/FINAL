
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search hospitals, locations, or specialties..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <motion.div 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          animate={{ 
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? '#10913b' : '#9ca3af' 
          }}
        >
          <Search className="h-5 w-5" />
        </motion.div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="pl-12 pr-10 py-6 border-2 focus:border-hospitrax-500 focus:ring-1 focus:ring-hospitrax-500 text-base placeholder:text-gray-400"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default SearchBar;
