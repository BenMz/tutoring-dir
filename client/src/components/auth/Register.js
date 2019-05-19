import React , {useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e =>{
    e.preventDefault();
    if(password !== confirmPassword)
    {

    } else {
      const newUser = {name, email, password}
      try{
        const config = {headers: {'Content-Type': 'application/json'}};
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users',body, config);
        console.log(res);

      }catch(err){
        console.error(err.response.data);
      }
    }
  }
  const {name, email, password, confirmPassword} = formData;
  document.body.classList.add('bg-dark');
  return (
<div className="container">
    <div className="card card-register mx-auto mt-5">
      <div className="card-header">Register an Account</div>
      <div className="card-body">
        <form onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-12">
                <div className="form-label-group">
                  <input name="name" type="text" id="name" value={name} onChange={e => onChange(e)} className="form-control" placeholder="Name" required="required" autoFocus="autofocus"/>
                  <label htmlFor="name">Name</label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <input name="email" type="email" id="inputEmail" value={email} onChange={e => onChange(e)} className="form-control" placeholder="Email address" required="required"/>
              <label htmlFor="inputEmail">Email address</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-label-group">
                  <input minLength='6' type="password" name="password" id="password"  value={password} onChange={e => onChange(e)}  className="form-control" placeholder="Password" required="required"/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-label-group">
                  <input minLength='6' name="confirmPassword" type="password" id="confirmPassword"  value={confirmPassword} onChange={e => onChange(e)}  className="form-control" placeholder="Confirm password" required="required"/>
                  <label htmlFor="confirmPassword">Confirm password</label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" href="login.html">Register</button>
        </form>
        <div className="text-center">
          <Link className="d-block small mt-3" to="/login">Login Page</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;