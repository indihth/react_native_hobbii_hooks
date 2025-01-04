import { createContext, useContext, ReactNode } from "react";

// creating the context globally so pathname context can be used anywhere
export const PathnameContext = createContext<string | undefined>(undefined);

// hook to use the context to retrieve the pathname
export const usePathname = () => {
  const context = useContext(PathnameContext);
  if (context === undefined) {
    throw new Error("usePathname must be used within a PathnameProvider");
  }
  return context;
};

// defining the component that'll wrap each page to set the pathname
export const PathnameProvider = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <PathnameContext.Provider value={value}>
      {children}
    </PathnameContext.Provider>
  );
};
