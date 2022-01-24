import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login ,selectErrorAuth} from "../store/auth";

export default function Login() {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrorAuth);
  //   const store = useSelector(state=>state)
  // console.log('stottttttttt,store',store)

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(credentials));
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {errors && <h3 className="text-danger">{errors.message}</h3> }
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
          <input
            required
            type="email"
            className="form-control" 
            id="exampleInputEmail1"
            placeholder="Email"
            value={credentials.email}
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
             className="form-control" 
            id="exampleInputPassword1"
            placeholder="Password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}