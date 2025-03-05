
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, User, Phone, Mail, KeyRound, CreditCard } from 'lucide-react';
import UserTypeSelector from './UserTypeSelector';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface SignupFormProps {
  onSignup: (userData: {
    userType: 'patient' | 'doctor' | 'admin';
    name: string;
    email: string;
    phone: string;
    aadhaarNumber?: string;
    password?: string;
  }) => void;
}

const SignupForm = ({ onSignup }: SignupFormProps) => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const validateAadhaar = (aadhaarNum: string) => {
    // Basic validation: 12 digits
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaarNum);
  };

  const handleSendOtp = () => {
    if (!phone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to receive OTP",
        variant: "destructive",
      });
      return;
    }
    
    if (userType === 'patient' && !validateAadhaar(aadhaarNumber)) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone",
    });
    setShowOtpInput(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    if (userType === 'patient') {
      if (!showOtpInput) {
        handleSendOtp();
        return;
      }
      
      if (!otp) {
        toast({
          title: "OTP required",
          description: "Please enter the verification code sent to your phone",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate patient signup with Aadhaar verification
      onSignup({
        userType: 'patient',
        name,
        email,
        phone,
        aadhaarNumber
      });
      
    } else {
      // Doctor or Admin signup
      if (!email || !password || !confirmPassword) {
        toast({
          title: "All fields required",
          description: "Please fill in all the required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate doctor/admin signup
      onSignup({
        userType,
        name,
        email,
        phone,
        password,
      });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="w-full max-w-md"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="mb-6">
        <UserTypeSelector selectedType={userType} onSelect={setUserType} />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {userType === 'patient' && (
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Aadhaar Number"
                className="pl-10"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={12}
                required
              />
            </div>
          )}

          {userType !== 'patient' && (
            <>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
        </div>

        {userType === 'patient' && showOtpInput && (
          <div className="space-y-1 animate-fade-in">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter OTP"
                className="pl-10"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              OTP sent to +91 {phone}
            </p>
          </div>
        )}
        
        <Button type="submit" className="w-full group">
          {userType === 'patient' && !showOtpInput ? (
            <>
              Send OTP <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              Sign Up <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account? <Link to="/" className="text-hospitrax-600 hover:text-hospitrax-700 font-medium">Log in</Link>
        </p>
        
        {userType === 'patient' && (
          <p className="mt-6 text-sm text-danger font-medium">
            Emergency? Call: <a href="tel:108" className="underline">108</a>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SignupForm;
