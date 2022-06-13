import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Layout from "./components/layouts";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter basename="/" >
      <Layout>
        <Routes location={window.location}>
          <Route path="/" element={<FormPage />} />
          <Route path="/table-page" element={<TablePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
