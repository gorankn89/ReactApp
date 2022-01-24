import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGradebooks,selectGradebooks } from "../store/gradebooks";
import GradebooksSearch from "../components/GradebooksSearch";
import { Link } from "react-router-dom";


export default function AppGradebooks() {
  const gradebooks = useSelector(selectGradebooks);
  // const store = useSelector(state=>state)
  // console.log('store',store);
  // console.log('gradebooks',gradebooks);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGradebooks({name:'',page:1}));
  }, []);

   const add = (pageNew) => {

   dispatch(getGradebooks({page:pageNew+1}));
  };

  return (
    <div className="container">
      <h1>Gradebooks</h1>
      <GradebooksSearch />
      {gradebooks.data.length ? (
      <ul>
        {gradebooks.data.map((gradebook) => (
          <li className="list-group-item" key={gradebook.id}>
             <div className="d-flex justify-content-between">
               <div><Link to={`/gradebooks/${gradebook.id}`}>{gradebook.name}</Link> </div>
              <div>{gradebook ?(<Link to={`/teachers/${gradebook.user.id}`}>{gradebook.user.first_name} {gradebook.user.last_name}</Link> ) : ( <div>No Teacher</div> )}</div>
      <div> {gradebook.created_at.slice(0,10)}</div>
      </div>
              </li>
        ))}
      </ul>
       ) : (
         <h3>No Gradebooks</h3>
      )}
       {gradebooks.current_page!==gradebooks.last_page && <button type="button" className="btn btn-block btn-primary" onClick={()=>add(gradebooks.current_page)}>LOAD MORE</button> }

    </div>
  );
}