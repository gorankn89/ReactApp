import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getGradebooks } from "../store/gradebooks";
import _ from "lodash";

export default function GradebooksSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    if (!searchTerm || searchTerm.length >0) {
      dispatch(getGradebooks({name:searchTerm,page:1}));
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
    <label htmlFor="searchGradebooks">Search gradebooks</label>
      <input
        type="text"
        className="form-control" 
        id="searchGradebooks"
        placeholder="Search gradebooks"
        onChange={debouncedChange}
      />
      </div>
    </div>
  );
}