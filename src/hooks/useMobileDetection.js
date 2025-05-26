// hooks/useMobileDetection.js
"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '@/Redux/store/uiSlice';

export const useMobileDetection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };

    handleResize(); // Set on first load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);
};
