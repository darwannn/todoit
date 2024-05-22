import { useState, createContext } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <Context.Provider
      value={{
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
