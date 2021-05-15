import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Hooks from "./hooks";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Hooks>
        <Navbar />
        <Routes />
      </Hooks>
    </BrowserRouter>
  );
}

export default App;
