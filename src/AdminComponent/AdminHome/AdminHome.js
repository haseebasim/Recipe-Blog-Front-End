import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";
import axios from "../../utils/Axios";
function AdminHome() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/posts/0/0")
      .then((res) => {
        setData(res.data);
        setLoading(false);
    })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);


  const handleDelete = (id) => {
      axios.delete(`/post/${id}`).then((res)=>{
         
      })
      .catch(res=>{
          console.log(res.data)
      });

  };

  const Cards = () => {
    const ah_cards = Data.map((post) => {
      return (
        <div key={post._id} className="ah_card">
          <p>{post.title}</p>
          <Link to={`/admin/edit/${post._id}`} className="ah_card_btn">
            <span className="far fa-edit"></span>
          </Link>
          <button onClick={()=>{handleDelete(post._id);}} type="button" name="delete" className="ah_card_btn">
            <span className="far fa-trash-alt"></span>
          </button>
        </div>
      );
    });

    return ah_cards;
  };

  return (
    <div className="admin_home">
      <Link className="addpost_btn" to="/admin/addpost">
        <span className="fa fa-plus"></span>
        <p>ADD POST</p>
      </Link>
      {Loading ? <div>DATA is Loading</div> : <Cards />}
    </div>
  );
}

export default AdminHome;
