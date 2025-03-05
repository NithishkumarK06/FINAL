
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hospitrax-50 to-white flex flex-col items-center justify-center p-4">
      <motion.div 
        className="max-w-md text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Logo />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold text-hospitrax-600 mb-4"
        >
          404
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-700 mb-8"
        >
          Oops! The page you're looking for cannot be found.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button 
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <ArrowLeft size={18} />
            Return to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
