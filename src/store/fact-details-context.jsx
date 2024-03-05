import { createContext, useState, useContext } from "react";
import { fetchFacts } from "../request";

const FactContext = createContext();

export const FactProvider = ({ children }) => {
  const [factDetails, setFactDetails] = useState(null);
  const [facts, setFacts] = useState();
  const [page, setPage] = useState(1);
  const mobileScreen = window.matchMedia("(max-width: 640px)").matches;

  const handleCloseDetails = () => {
    setFactDetails(null);
  };

  const handleFactDetails = (fact, event) => {
    event.preventDefault();
    setFactDetails(fact);
  };

  const fetchData = async () => {
    const data = await fetchFacts(page);
    setFacts(data);
  };

  const handleNextPage = () => {
    if (page === 34) {
      return;
    } else {
      setPage(page + 1);
      setFactDetails(null);
    }
  };

  const handlePrevPage = () => {
    if (page === 1 || page === 34) {
      return;
    } else {
      setPage(page - 1);
      setFactDetails(null);
    }
  };

  return (
    <FactContext.Provider
      value={{
        factDetails,
        setFactDetails,
        handleCloseDetails,
        handleFactDetails,
        fetchData,
        facts,
        handlePrevPage,
        handleNextPage,
        page,
        mobileScreen,
      }}
    >
      {children}
    </FactContext.Provider>
  );
};

export const useFactContext = () => useContext(FactContext);
