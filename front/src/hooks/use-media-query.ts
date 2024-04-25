import { useState, useEffect } from 'react';

const useMediaQuery = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
            const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

            setIsMobile(isMobile);
            setIsTablet(isTablet);
            setIsDesktop(isDesktop);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useMediaQuery;