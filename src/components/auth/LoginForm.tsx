
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Phone, Mail, KeyRound, CreditCard } from 'lucide-react';
import UserTypeSelector from './UserTypeSelector';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (userData: {
    userType: 'patient' | 'doctor' | 'admin';
    identifier: string;
    password?: string;
  }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
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
    
    if (!validateAadhaar(aadhaarNumber)) {
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
      
      // Simulate patient login
      onLogin({
        userType: 'patient',
        identifier: phone,
      });
    } else {
      // Doctor or Admin login
      if (!email || !password) {
        toast({
          title: "All fields required",
          description: "Please enter your email and password",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate doctor/admin login
      onLogin({
        userType,
        identifier: email,
        password,
      });
    }
  };

  const handleUseEmail = () => {
    setUserType('doctor');
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
        {userType === 'patient' ? (
          <>
            <div className="space-y-2">
              {!showOtpInput ? (
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Aadhaar Number"
                      className="pl-10"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                      maxLength={12}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleUseEmail}
                      className="text-xs text-hospitrax-600 hover:text-hospitrax-700 transition-colors"
                    >
                      Use Email
                    </button>
                  </div>
                </div>
              ) : (
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
            </div>
            
            <Button type="submit" className="w-full group">
              {!showOtpInput ? (
                <>
                  Send OTP <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Verify & Login <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full group">
              Login <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-hospitrax-600 hover:text-hospitrax-700 font-medium">Sign up</Link>
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

export default LoginForm;
