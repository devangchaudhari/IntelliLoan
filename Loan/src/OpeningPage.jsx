import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importing Framer Motion
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const OpeningPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/auth');
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex items-center justify-center min-h-screen bg-gray-200 relative">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/path_to_your_background_image.jpg)' }}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Initial state for animation
        animate={{ opacity: 1, scale: 1 }} // Animate when in view
        transition={{ duration: 0.5 }} // Animation duration
      >
        <CardDefault handleNext={handleNext} />
      </motion.div>
    </div>
  );
};

export function CardDefault({ handleNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial state for animation
      animate={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.5, delay: 0.2 }} // Animation duration with delay
    >
      <Card className="mt-6 w-full max-w-sm shadow-2xl rounded-lg"> {/* Added shadow-2xl and rounded-lg for a soft shadow effect */}
        <CardHeader color="" className="relative h-56">
          <img
            src="/loan_logo.png" // Replace with your actual image path
            alt="IntelliLoan logo"
            className="w-full h-full object-cover rounded-t-lg" // Added rounded-t-lg for rounded corners
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
            InteliLoan
          </Typography>
          <Typography className="text-center">
            Your trusted partner in simplifying the loan approval process.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleNext} className="w-full">Explore</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default OpeningPage;


