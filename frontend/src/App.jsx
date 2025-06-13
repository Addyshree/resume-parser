import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminHistory from "./pages/AdminHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
