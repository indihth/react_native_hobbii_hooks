import PatternIndex from "@/components/PatternIndex";
import { PathnameProvider } from "@/contexts/PathnameContext";

const Favorites = () => {
  return (
    <PathnameProvider value="favorites">
      {/* uses user's favourite patterns endpoint to fetch data */}
      <PatternIndex api_endpoint="/patterns/favourites" /> 
    </PathnameProvider>
  );
};

export default Favorites;
