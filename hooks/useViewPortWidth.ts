import { useEffect, useState } from 'react';

const useViewPortWidth = () => {
  const [viewPortWidth, setViewPortWidth] = useState(0);

  useEffect(() => {
    setViewPortWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setViewPortWidth(window.innerWidth);
    });
  }, []);

  return viewPortWidth;
};

export default useViewPortWidth;
