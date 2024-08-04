
import { Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Home from "./components/Home";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatBot />} />
      {/* <Route path="/login" element={<Land />} /> */}
    </Routes>
  );
};

export default App;
