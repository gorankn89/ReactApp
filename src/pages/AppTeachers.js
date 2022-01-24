import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers,selectTeachers } from "../store/teachers";
import TeachersSearch from "../components/TeachersSearch";
import { Link } from "react-router-dom";

export default function AppTeachers() {
  const teachers = useSelector(selectTeachers);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, []);


  return (
    <div className="container">
      <h1>Teachers</h1>
 <TeachersSearch />
      <ul>
        {teachers.map((teacher) => (
          <li className="list-group-item" key={teacher.id}>
             <div className="d-flex justify-content-start">
               <div><img src={teacher.image_url} style={{width: "150px",height:"100px"}}></img>   </div> 
              <div> <Link to={`/teachers/${teacher.id}`}> {teacher.first_name} {teacher.last_name}</Link>
               {teacher.gradebook ?<p><Link to={`/gradebooks/${teacher.gradebook.id}`}> {teacher.gradebook.name}</Link></p> :<p>Professor is available</p>}</div>         
             </div>
              </li>
        ))}
      </ul>
    </div>
  );
}