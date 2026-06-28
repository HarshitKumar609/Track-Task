import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-100 to-purple-200">
      <Navbar />

      <main className="pt-32 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
