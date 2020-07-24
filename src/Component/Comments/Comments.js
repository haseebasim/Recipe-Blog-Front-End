import React , {useEffect } from 'react'
import { connect } from 'react-redux';
import {fetchComments} from '../../Redux/actions/commentAction'


function Comments({ recipe_id , fetchComments, comments}) {
    
    useEffect(() => {
      fetchComments(recipe_id)
  }, [comments,fetchComments,recipe_id]);

  const PostComments = ()=>{
        const arr = comments.map(comment =>{
            return (
              <div className="comment" key={comment._id}>
                <p className="comment_name">{comment.name}</p>
                <p className="comment_text">
                  {comment.comment_text}
                </p>
              </div>
            );
        }) 
        return arr
  }
 

  return (
    <div>
      <PostComments/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.items,
});

export default connect(mapStateToProps,{fetchComments})(Comments)
