import { useContext } from 'react';
import { createContext } from 'react';

const CollectionContext = createContext();

const CollectionProvider = ({ children }) => {
  return (
    <CollectionContext.Provider value={{ test: 'Test value' }}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
export const useCollection = () => useContext(CollectionContext);
