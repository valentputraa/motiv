import UserNavbar from "../components/UserNavbar"
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:8000/api/posts");
      setPosts(data.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect ( () => {
    getPosts()
  }, []);

  return (
    <div>
      <UserNavbar/>
      <div className="row mb-2 mt-4">
    {posts.map((post, index) => (
      <div className="col-md-4" key={index}>
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary-emphasis">{post.title}</strong>
          <h3 className="mb-0">Newest Post</h3>
          <p className="card-text mb-auto">{post.article_content.substring(0,50)}</p>
          <a href={`post/${post.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg className="bi"><use xlinkHref="#chevron-right"/></svg>
          </a>
        </div>
        <div className="col-auto d-none d-lg-block">
          <img src={`http://127.0.0.1:8000/api/storage/${post.image}`} alt=""  width="200" height="250" />
        </div>
      </div>
    </div>
    ))}
 
  </div>
    </div>
  )
}

export default Home