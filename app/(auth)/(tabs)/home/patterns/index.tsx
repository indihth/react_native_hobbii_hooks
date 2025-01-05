import PatternIndex from "@/components/PatternIndex";
import { PathnameProvider } from "@/contexts/PathnameContext";
const PatternFeed = () => {
  return (
    // Global context provider to set the pathname
    <PathnameProvider value="home/patterns">
      {/* uses general patterns endpoint to fetch data*/}
      <PatternIndex api_endpoint="/patterns/archived" />
    </PathnameProvider>
  );
};

export default PatternFeed;
