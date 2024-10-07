import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const host = 'https://anabeya-backend.onrender.com'

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`${host}/user/login-user`, {
          method: 'POST',
          headers: {
              'Content-Type': 'Application/json',
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if (json.success) { 
          localStorage.setItem('token', json.authToken)
    
          navigate("/cart");
          props.showAlert('Successfully Loged In','success');
      }
      else {
        
        console.log('Error login');
        props.showAlert('Please try again with correct credentials','error')
      }
  }
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
    return (
      <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" onChange={onChange}/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" onChange={onChange}/>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Login</button>
          </div>
        </form>
        <p className='mt-2 text-center'><Link to='/signup'>Register an account</Link></p>
      </div>
    </div>
      
      </>
    )
}
