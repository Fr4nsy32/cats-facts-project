import { useEffect, useState } from "react";
import "./styles/FactList.css";
import FactDetails from "./FactDetails";
import { useFactContext } from "../store/fact-details-context";
import { motion  } from "framer-motion";

export default function FactList() {
  const {
    factDetails,
    handleFactDetails,
    fetchData,
    facts,
    page,
    mobileScreen,
  } = useFactContext();

  const [animateFactList, setAnimateFactList] = useState(false);

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setAnimateFactList(true);
  }, [page]);

  function handleAnimation() {
    setAnimateFactList(false);
  }

  return (
    <>
      <div className="row">
        <div className="column">
          <ul>
            {facts &&
              facts.map((fact) => (
                <motion.div
                key={Math.floor(Math.random() * 10000)}
                initial={animateFactList ? { y: -50, opacity: 0 } : {}}
                animate={animateFactList ? { y: 0, opacity: 1 } : {}}
                transition={animateFactList ? { duration: 1 }: {} }
                className="card"
              >
                  <a
                    className="card1"
                    style={factDetails &&
                      factDetails.fact === fact.fact
                        ? { backgroundColor: "#00838d" }
                        : null
                    }
                    href="#"
                    onClick={(event) => { handleFactDetails(fact.fact, fact.image, event); handleAnimation(); }}
                  >
                    <div className="container-fact">
                    <p
                      style={factDetails &&
                        factDetails.fact === fact.fact ? { color: "white" } : null
                      }
                    >
                      {fact.fact}
                    </p>
                    <img className='list-img' src={fact.image} alt="cat photo" />
                    </div>
                    <p
                      className="small"
                      style={factDetails &&
                        factDetails.fact === fact.fact ? { color: "white" } : null
                      }
                    >
                      Length: {fact.length}
                    </p>
                    <div className="go-corner" href="#">
                      <div className="go-arrow">{mobileScreen ? "↓" : "→"}</div>
                    </div>
                  </a>
                </motion.div>
              ))}
          </ul>
        </div>
        {factDetails && <FactDetails key={Math.floor(Math.random() * 10000)} factDetails={factDetails} />}
      </div>
    </>
  );
}
