import { createContext, useContext, useState } from 'react';

const ElementContext = createContext();

export const ElementProvider = ({ children }) => {
  const [elementCount, setElementCount] = useState(0);

  return (
    <ElementContext.Provider value={{ elementCount, setElementCount }}>
      {children}
    </ElementContext.Provider>
  );
};

export const useElementContext = () => useContext(ElementContext);