import { Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Detail } from "./page/Detail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/episode/:id" element={<Detail />} />
    </Routes>
  );
}

export default App