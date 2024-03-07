import "./styles/FactDetails.css";
import { useFactContext } from "../store/fact-details-context";
import { motion } from "framer-motion";

export default function FactDetails() {
  const { factDetails, handleCloseDetails, mobileScreen } = useFactContext();

  return (
    <div className="column">
      <div className="overlay"></div>
      <motion.div
        className="card-details"
        initial={{ x: "100vh", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: (mobileScreen ? 0.7 : 1.2) }}
      >
        {factDetails && (
          <>
            <button className="close-button" onClick={handleCloseDetails}>
              <p>X</p>
            </button>
            <div className="card-header">
              <p>{factDetails.fact}</p>
              <img src={factDetails.image} alt="cat" />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
