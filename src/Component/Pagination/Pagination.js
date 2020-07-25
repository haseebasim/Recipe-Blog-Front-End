import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { connect } from "react-redux";
import {fetchPostCount} from '../../Redux/actions/paginationAction'
function Pagination({ShowPag,limit, handleSkip , fetchPostCount, count}) {
  
  const [active, setActive] = useState("1");
  useEffect(() => {
    fetchPostCount()
    return () => {};
  }, [fetchPostCount]);


  const handlePag = (e) => {
    e.preventDefault();
    if (e.target.name !== active) {
      handleSkip(e.target.value);
    } 
    
    setActive(e.target.name)
  };

  const PagBtn = () => {
    const pagCount = Math.ceil(count / limit);
    const btn_arr = [];

    for (var i = 0; i < pagCount; i++) {
      btn_arr.push(
        <button
          key={i}
          onClick={handlePag}
          name={i+1}
          type="button"
          className={`pagination_btn ${active === `${i+1}` ? "active_pag_btn" : ""}`}
          value={10*i}
        >
          {i+1}
        </button>
      ); 
    }
    return btn_arr;
  };
  return (
    <div className="Pagination">
      {ShowPag ? <PagBtn/>:null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  count : state.pagination.count
  
});

export default connect(mapStateToProps,{fetchPostCount})(Pagination);
