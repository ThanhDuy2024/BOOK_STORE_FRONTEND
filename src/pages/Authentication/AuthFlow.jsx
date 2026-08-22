import React, { useState } from 'react';
import { Register } from './Register';
import { OtpVerification } from './OtpVerification';

export const AuthFlow = () => {
  const [step, setStep] = useState('register');
  const [userData, setUserData] = useState(null);

  const handleNavigateToOtp = (data) => {
    setUserData(data);
    setStep('otp');
  };

  return (
    <div>
      {step === 'register' ? (
        <Register onNavigateToOtp={handleNavigateToOtp} />
      ) : (
        <OtpVerification
          userData={userData}
          onBack={() => setStep('register')}
        />
      )}
    </div>
  );
};