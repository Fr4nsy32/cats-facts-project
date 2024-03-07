import { createContext, useState, useContext } from "react";
import { fetchFacts, getFactImage } from "../request";

const FactContext = createContext();

export const FactProvider = ({ children }) => {
  const [factDetails, setFactDetails] = useState(null);
  const [facts, setFacts] = useState([]);
  const [page, setPage] = useState(1);
  const mobileScreen = window.matchMedia("(max-width: 640px)").matches;

  const handleCloseDetails = () => {
    setFactDetails(null);
  };

  const handleFactDetails = (fact, image, event) => {
    event.preventDefault();
    setFactDetails({fact: fact, image: image});
  };

  const fetchData = async () => {
    const data = await fetchFacts(page);
    data.map((fact) => (
      setFacts((prevFact) => [
        ...prevFact,
        {fact: fact.fact, length: fact.length, image: getFactImage()}])
    ));
  };

  const handleNextPage = () => {
    if (page === 34) {
      return;
    } else {
      setPage(page + 1);
      setFactDetails(null);
      setFacts([]);
    }
  };

  const handlePrevPage = () => {
    if (page === 1 || page === 34) {
      return;
    } else {
      setPage(page - 1);
      setFactDetails(null);
      setFacts([]);
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
