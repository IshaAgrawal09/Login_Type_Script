import { Routes, Route } from "react-router-dom";
import "./App.css"
import "@shopify/polaris/build/esm/styles.css";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Panel/Dashboard";
function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/dashboard" element={<Dashboard />}/>
     </Routes>
    </div>
  );
}

export default App;
