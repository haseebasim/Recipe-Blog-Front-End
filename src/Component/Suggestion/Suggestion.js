import React, { useState } from "react";
import "./Suggestion.css";
import axios from "../../utils/Axios";
import { Link } from "react-router-dom";
function Suggestion() {
  const [Suggestion, setSuggestion] = useState("");
  const handleSuggestion = (e) => {
    e.preventDefault();
    if (Suggestion !== "") {
      axios.post(
        "suggestion",
        {
          comment: Suggestion,
          subject: "Suggestion",
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
        }
      ).then(res=>{
        window.location.reload()
      });
    }
  };
  return window.sessionStorage.getItem("isLogedIn") ? (
    <div className="suggestion">
      <h1>Suggestions</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic.
      </p>
      <form className="suggestion_form">
        <textarea
          type="text"
          placeholder="Suggestions?"
          value={Suggestion}
          onChange={(e) => {
            setSuggestion(e.target.value);
          }}
          name="Suggestions"
          required
        />
        <button type="submit" onClick={handleSuggestion}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className="ask_login">
      Please <Link to="/login">Login</Link> to access this page
    </div>
  );
}

export default Suggestion;
