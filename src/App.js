import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
