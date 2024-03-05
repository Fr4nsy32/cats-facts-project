import FactList from "./components/FactList";
import Navbar from "./components/Navbar";
import { FactProvider } from "../src/store/fact-details-context";

function App() {
  return (
    <>
      <FactProvider>
        <Navbar />
        <FactList />
      </FactProvider>
    </>
  );
}

export default App;
