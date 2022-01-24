import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams  } from "react-router";
import { useEffect } from "react";
import { createStudent, selectGradebook,deleteStudent,selectErrorGradebook } from "../store/gradebooks";

export default function EditGradebook() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
const gradebook= useSelector(selectGradebook);
const errors = useSelector(selectErrorGradebook);
 
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    image_url: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      createStudent({
        gradebook_id:id,
        student:studentData,
        onSuccess: () => {
          history.goBack();
        },
      })
    );
  }

  const deleteStudents = (student_id) => {
 dispatch(
      deleteStudent({
        id: student_id,
        onSuccess: () => {
           history.goBack();
        },
      })
    );

  };

useEffect(() => {
    
  }, []);

  return (
    <div className="container">
        <h1>Edit Gradebook</h1>
      <form >
        <div className="form-group">
    <label htmlFor="firstName">First name</label>
          <input
            required
            className="form-control" 
            id="firstName"
            placeholder="First name"
            value={studentData.first_name}
            onChange={({ target }) =>
              setStudentData({ ...studentData, first_name: target.value })
            }
          />
          {errors?.first_name && <div className="text-danger">{errors.first_name}</div> }
        </div>
         <div className="form-group">
    <label htmlFor="lastName">Last name</label>
          <input
            required
            className="form-control"
            id="lastName"
            placeholder="Last name"
            value={studentData.last_name}
            onChange={({ target }) =>
              setStudentData({ ...studentData, last_name: target.value })
            }
          />
          {errors?.last_name && <div className="text-danger">{errors.last_name}</div> }
        </div>
         <div className="form-group">
    <label htmlFor="imageUrl">Image url</label>
          <input
            required
            className="form-control"
            id="imageUrl"
            placeholder="Image url"
            value={studentData.image_url}
            onChange={({ target }) =>
              setStudentData({ ...studentData, image_url: target.value })
            }
          />
          {errors?.image_url && <div className="text-danger">{errors.image_url}</div> }
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
      </form>

<h3>Students</h3>
<ul>
          {gradebook.students.map((student) => (
          <li className="list-group-item" key={student.id}>
             <div className="p-2 d-flex justify-content-between">
               <div>{student.first_name} {student.last_name}</div> 
               <div><button type="button" className="btn btn-danger" onClick={()=>deleteStudents(student.id)}>Delete student</button></div>
               </div>
              </li>
        ))}
</ul>
    </div>
  );
}