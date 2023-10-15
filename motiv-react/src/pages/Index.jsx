import Navbar from "../components/Navbar";
import UserNavbar from "../components/UserNavbar";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import { Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {

  const [latestData, setLatestData] = useState([])
  const [notification, setNotification] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token")


  const handleNotification = (message) => {
    setNotification(message);
  };


  const getPosts = async () => {
    try {
      const posts = await axios.get("http://127.0.0.1:8000/api/posts");
      setLatestData(posts.data.data.slice(-2))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect ( () => {
    getPosts()
    if (token) {
      setIsLoggedIn(true)
    }
  }, []);

  return (
    <div>
        {isLoggedIn ? <UserNavbar/> : <Navbar/>}

      <LoginModal/>
      <SignUpModal onSuccess={handleNotification} />

      <Container fluid>
      {notification && (
  <div className="alert alert-success mt-2" role="alert">
    {notification}
  </div>
)}
        <Row className="bg-dark-subtle" style={{ height : "40vh" }}>
          <Col md={6} className="ms-4">
            <div className="p-5" >
              <h1 className="mb-4">Stay Motivated</h1>
              <p className="mb-3">Discover a world of writer&apos;s insights on any topic.</p>
              <Button className="badge p-3 btn-dark">Start Reading</Button>
            </div>
          </Col>
        </Row>

 <div className="row mb-2 mt-4">
    {latestData.map((latestData, index) => (
      <div className="col-md-6" key={index}>
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary-emphasis">{latestData.title}</strong>
          <h3 className="mb-0">Newest Post</h3>
          <p className="card-text mb-auto">{latestData.article_content.substring(0,50)}</p>
          <a href={`post/${latestData.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg className="bi"><use xlinkHref="#chevron-right"/></svg>
          </a>
        </div>
        <div className="col-auto d-none d-lg-block">
          <img src={`http://127.0.0.1:8000/api/storage/${latestData.image}`} alt=""  width="200" height="250" />
        </div>
      </div>
    </div>
    ))}
 
  </div>
      </Container>
    </div>
  );
};

export default Index;
