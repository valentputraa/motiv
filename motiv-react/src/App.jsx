import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Index from "./pages/Index";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index}/>
        <Route path="/home" Component={Home}/>
        <Route path="/post/:id" Component={Post}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
