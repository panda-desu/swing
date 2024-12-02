import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./partials/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./partials/Login";
import Home from "./pages/Home";
import NotFound from "./partials/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
     <Router>  
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
              }
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
