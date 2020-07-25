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
        const snackbar = document.getElementsByClassName("snackbar")[0];
        snackbar.classList.add("snackbar_show");
        setTimeout(function () {
          snackbar.classList.remove("snackbar_show");
          
        }, 3000);
      });
    }
  };
  return window.sessionStorage.getItem("isLogedIn") ? (
    <div className="suggestion">
      <h1>Suggestions</h1>
      <p>
        Did you like our work? Or do u think we can imporve our work? Do you have any suggestions? Feel free to give your suggestions using the following form. We always look forward to people giving us feed back and suggesting dishes. Thank you.
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
      <div className="snackbar">
          Suggestion has been submited
      </div>
    </div>
  ) : (
    <div className="ask_login">
      Please <Link to="/login">Login</Link> to access this page
    </div>
  );
}

export default Suggestion;
