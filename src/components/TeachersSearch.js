import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getTeachers } from "../store/teachers";
import _ from "lodash";

export default function TeachersSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    if (!searchTerm || searchTerm.length > 0) {
      dispatch(getTeachers(searchTerm));
    }
  };

  const debouncedChange = useCallback(
    _.debounce(handleChangeSearchTerm, 500),
    []
  );

  useEffect(() => {
    search();
  }, [searchTerm]);

  return (
    <div>
      <div className="form-group">
    <label htmlFor="searchTeachers">Search teachers name</label>
      <input
        type="text"
        className="form-control" 
        id="searchTeachers"
        placeholder="Search teachers"
        onChange={debouncedChange}
      />
      </div>
    </div>
  );
}