import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createGradebook,selectErrorGradebook } from "../store/gradebooks";
import { getFreeTeachers,selectFreeTeachers } from "../store/teachers";
import { useEffect } from "react";


export default function CreateGradebook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const freeTeachers = useSelector(selectFreeTeachers);
const errors = useSelector(selectErrorGradebook);

  const [gradebookData, setGradebookData] = useState({
    name: "",
    user_id: "",
  });

 useEffect(() => {
    if(freeTeachers.length) setGradebookData({...gradebookData,user_id:freeTeachers[0].id})
  }, [freeTeachers]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      createGradebook({
        gradebook: gradebookData,
        onSuccess: () => {
          history.push(`/`);
        },
      })
    );
  }

useEffect(() => {
    dispatch(getFreeTeachers());
  }, []);

  return (
    <div className="container">
        <h1>Create Gradebook</h1>
      <form >
        <div className="form-group">
        <label htmlFor="name">Name</label>  
          <input
            required
            minLength='2'
            className="form-control" 
            id="name"
            placeholder="Name"
            value={gradebookData.name}
            onChange={({ target }) =>
              setGradebookData({ ...gradebookData, name: target.value })
            }
          />
         {errors?.name && <div className="text-danger">{errors.name}</div> }
        </div>

<div className="form-group">
  <label htmlFor="name">Select teacher</label>
        <select className="custom-select"
          onChange={({ target }) =>
            setGradebookData({ ...gradebookData, user_id: target.value })
          }
          value={freeTeachers.length  && freeTeachers[0].user_id}
        //   defaultInputValue={gradebookData[0].user_id}
        >
          {freeTeachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.first_name} {teacher.last_name}
            </option>
          ))}
        </select>
        {errors?.user_id && <div className="text-danger">{errors.user_id}</div> }
        </div>
        <button type="button" className="btn btn-block btn-primary" onClick={handleSubmit} >Submit</button>
      </form>
       <button type="button" className="btn btn-block btn-danger" onClick={()=> history.push(`/`)} >Cancel</button>
    </div>
  );
}