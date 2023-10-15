import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import UserNavbar from "../components/UserNavbar";
import Navbar from "../components/Navbar";

const Post = () => {
  const [post, setPost] = useState([]);
  const [username, setUsername] = useState("");
  const [article, setArticle] = useState("");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");
  const { id } = useParams();

  const postComment = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        "http://127.0.0.1:8000/api/comment",
        {
          id_post: id,
          comment: inputComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    try {
      const data = await axios.get(`http://127.0.0.1:8000/api/post/${id}`);
      setPost(data.data.data);
      setUsername(data.data.data.writer.username);
      setArticle(data.data.data.article_content);
      setComments(data.data.data.comments);
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getPost();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <UserNavbar /> : <Navbar />}
      <Container>
        <Row>
          <Col className="me-5 mt-5">
            <h1>{post.title}</h1>
            <h2>{username}</h2>
            <p>{post.created_at}</p>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <img
              src={`http://127.0.0.1:8000/api/storage/${post.image}`}
              alt=""
              width="200"
              height="250"
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-4 paragraph">
            {article.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Comments</h5>
            <Form onSubmit={postComment}>
              <Form.Control
                type="text"
                placeholder="add comments..."
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Button variant="primary" className="mt-2" type="submit" disabled={!isLoggedIn}>
                  Kirim
                </Button>
                <Button
                  variant="light"
                  className="mt-2 me-2"
                  onClick={() => setInputComment("")}
                >
                  Batal
                </Button>
              </div>
            </Form>
            {comments
              .map((comment, index) => (
                <Card key={index} className="mt-3">
                  <Card.Body>
                    <Card.Title>{comment.username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {comment.created_at}
                    </Card.Subtitle>
                    <Card.Text>{comment.comment_content}</Card.Text>
                  </Card.Body>
                </Card>
              ))
              .reverse()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
