import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Index from "./pages/Index";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreateArticle from "./pages/CreateArticle";
import Profil from "./pages/Profil";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index}/>
        <Route path="/home" Component={Home}/>
        <Route path="/post/:id" Component={Post}/>
        <Route path="/make-article" Component={CreateArticle}/>
        <Route path="/profil/:id" Component={Profil}/>
        <Route path="/edit/:id" Component={EditArticle}/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
