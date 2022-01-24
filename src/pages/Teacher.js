import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTeacher, selectTeacher } from "../store/teachers";
import { Link } from "react-router-dom";

export default function Teacher() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const teacher = useSelector(selectTeacher);

  useEffect(() => {
    dispatch(getTeacher(id));
  }, [id]);

  if (!teacher) {
    return null;
  }
  return (
    <div className="container">
      <h3>{teacher.first_name}</h3>
     <h3>{teacher.last_name}</h3>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <img width="300px" src={teacher.image_url} alt="pic-any" />
      </div>
      {teacher.gradebook ? (
        <div>
      <h3><Link to={`/gradebooks/${teacher.gradebook.id}`}>{teacher.gradebook.name}</Link></h3>
       <h3>Number of students: {teacher.gradebook.students.length}</h3>
       </div>
       ) : (
        <h3>No Gradebook</h3>
      )}
    </div>
  );
}