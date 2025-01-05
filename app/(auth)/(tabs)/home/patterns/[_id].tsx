// exporting entire Pattern page while maintaining file structure and navigation
import React from 'react';
import { PathnameContext } from '@/contexts/PathnameContext';
import Pattern from '@/components/Pattern';

const PatternPage = () => {
    return (
        <PathnameContext.Provider value="home/patterns/">
            <Pattern />
        </PathnameContext.Provider>
    );
};

export default PatternPage;