import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router";
import { getGradebook, selectGradebook } from "../store/gradebooks";
import {selectActiveUser } from "../store/auth";
import { createComment,deleteComment,throwComment,deleteGradebook,selectErrorGradebook } from "../store/gradebooks";

export default function Gradebook() {
  const dispatch = useDispatch();
  const { id } = useParams();
 const history = useHistory();
 const errors = useSelector(selectErrorGradebook);

const [commentData, setCommentData] = useState({
    content: "",
  });

 const activeUser = useSelector(selectActiveUser);
// console.log('activeUser',activeUser);
// console.log('activeUser_id',activeUser?.id);


  const gradebook= useSelector(selectGradebook);


  useEffect(() => {
    dispatch(getGradebook(id));
  }, [id]);

  if (!gradebook) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      createComment({
        gradebook_id:id,
        comment: commentData,
      })
    );
    setCommentData({ ...commentData, content: '' })
  }

  const deleteComments = (comment_id) => {
       let response = window.confirm(
      "Are you sure you want to delete this comment ?\n Enter 'OK' if you are"
    );

    if (!response) {
      return;
    }
  dispatch(deleteComment(comment_id));
  dispatch(throwComment(comment_id));
  };

  const deleteGradebooks = (gradebook_id) => {
       let response = window.confirm(
      "Are you sure you want to delete this gradebook ?\n Enter 'OK' if you are"
    );

    if (!response) {
      return;
    }
  
 dispatch(
      deleteGradebook({
        id: gradebook_id,
        onSuccess: () => {
          history.push('/');
        },
      })
    );

  };

  return (
    <div className="container">
      <div className="d-flex flex-row">
     <div className="p-2"> {activeUser?.id===gradebook.user?.id &&<button type="button" className="btn btn-primary" onClick={()=> history.push(`/gradebooks/${id}/students/create`)}>Add New Student</button>}</div>
     <div className="p-2"> {activeUser?.id===gradebook.user?.id &&<button type="button" className="btn btn-danger" onClick={()=>deleteGradebooks(gradebook.id)}>Delete Gradebook</button>}</div>
     <div className="p-2"> {activeUser?.id===gradebook.user?.id &&<button type="button" className="btn btn-primary" onClick={()=> history.push(`/gradebooks/${id}/edit`)}>Edit Gradebook</button>}</div>
         </div>
          <h3>Gradebook: {gradebook.name}</h3>   
          <h3>Profesor: {gradebook.user.first_name} {gradebook.user.last_name}</h3> 
          <h3>Students</h3>
{gradebook.students.length ? (
          <ul>
          {gradebook.students.map((student) => (
          <li className="list-group-item" key={student.id}>
             <div>{student.first_name} {student.last_name}</div>
              </li>
        ))}
        </ul>
         ) : (
        <div>No Students</div>
      )}


<h3>Comments</h3>

<ul>
{gradebook.comments_of_gradebook.map((comment) => (
          <li className="list-group-item" key={comment.id}>
             <div className="d-flex flex-column">
               <div className="p-2" className="text-break" >Comment content: {comment.content}</div> 
               <div className="p-2 d-flex justify-content-between">User: {comment.user.first_name} {comment.user.last_name} {activeUser?.id===comment.user?.id &&<button type="button" className="btn btn-danger" onClick={()=>deleteComments(comment.id)}>Delete Comment</button>}</div>
               </div>
              </li>
        ))}
</ul>

<h3>Create Comment</h3>
      <form >
           <div className="form-group">
           <label htmlFor="createComment">Create comment</label>
          <input
            required
            maxLength='1000'
            className="form-control" 
            id="createComment"
            placeholder="Content"
            value={commentData.content}
            onChange={({ target }) =>
              setCommentData({ ...commentData, content: target.value })
            }
          />
           {errors?.content && <div className="text-danger">{errors.content}</div> }
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
      </form>

    </div>
  );
}