import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    
  });
  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e =>{
    e.preventDefault();

    const user = {email, password}
    try{
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify(user);
      const res = await axios.post('/api/auth',body, config);
      console.log(res);

    }catch(err){
      console.error(err.response.data);
    }
    
  }

  document.body.classList.add('bg-dark');
  return (
  <div className="container">
    <div className="card card-login mx-auto mt-5">
      <div className="card-header">Login</div>
      <div className="card-body">
        <form onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <div className="form-label-group">
              <input name="email" value={email} onChange={e => onChange(e)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="required" autoFocus="autofocus"/>
              <label htmlFor="inputEmail">Email address</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <input name="password" value={password} onChange={e => onChange(e)} type="password" id="inputPassword" className="form-control" placeholder="Password" required="required"/>
              <label htmlFor="inputPassword">Password</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <div className="text-center">
          <Link className="d-block small mt-3" to="/register">Register an Account</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;