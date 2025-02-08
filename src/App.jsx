import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadFile from "./components/UploadFile";
import CreditReport from "./components/CreaditReport";
import IndividualView from "./components/IndividualView";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadFile />} />
        <Route path="/credit-report" element={<CreditReport />} />
        <Route path="/individualView/:id" element={<IndividualView />} />
      </Routes>
    </BrowserRouter>
  );
}
