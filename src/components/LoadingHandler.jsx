import React, { useEffect, useState } from 'react';



const LoadingHandler = ({ status, succeeded, rejected, value }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    let timer;
    if (status === 'loading') {
      timer = setTimeout(() => {
        setCurrentStatus('failed');
      }, 1000); 
    } else {
      setCurrentStatus(status);
    }

    return () => clearTimeout(timer); 
  }, [status]);
  if (currentStatus === 'loading') {
    return 'CARGANDO.....' ;
  } else if (currentStatus === 'succeeded') {
    return succeeded;
  } else if (currentStatus === 'failed' ) {
    return <span style={{ color: 'red' }}>{ rejected }</span>;
  } else {
    return null;
  }
};

export default LoadingHandler;
