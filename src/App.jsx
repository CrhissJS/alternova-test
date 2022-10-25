import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import "bootswatch/dist/journal/bootstrap.min.css";
import { NavBar } from "./components";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
