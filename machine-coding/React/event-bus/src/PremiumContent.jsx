import React, { useEffect, useState } from 'react';
import eventBus from './eventBus';

const PremiumContent = () => {
  const [premiumData, setPremiumData] = useState('');

  useEffect(() => {
    const handleButtonClick = (data) => {      
      setPremiumData(data.data);
    };

    eventBus.on('buttonClicked', handleButtonClick);

    return () => {
      eventBus.off('buttonClicked', handleButtonClick);
    };
  }, []);

  return <div>
    <h2>Premium Component</h2>
    <h3>message: {premiumData?.message}</h3>
    <h3>userType: {premiumData?.isPremium ? "Premium" : "Guest"}</h3>
  </div>;
};

export default PremiumContent;