import { BrowserRouter } from "react-router-dom";
import Hooks from "./hooks";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Hooks>
        <Routes />
      </Hooks>
    </BrowserRouter>
  );
}

export default App;
