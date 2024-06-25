import { useState, useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaMeta, FaApple } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase"; // Ensure the correct path to your firebase.js
import { UserContext } from './UserContext'; // Import UserContext

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log(result);
      navigate('/'); // Navigate to profile page after successful login
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const emailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log(result);
      navigate('/'); // Navigate to profile page after successful login
    } catch (error) {
      console.error("Error during email/password login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl shadow-md w-full max-w-2xl" style={{ height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          <img src="https://i.postimg.cc/ZKTGpKNN/Vector.png" alt="logo" className="max-w-full w-[50px] bg-white py-2 px-2 rounded-[50%] h-auto" />
        </h2>
        <form className="w-full max-w-md flex-grow" onSubmit={emailPasswordLogin}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="text-[#4F4F4F] mx-4">Or Continue with</div>
            <div className="border-t border-gray-400 flex-grow"></div>
            <div className="border-t border-gray-400 flex-grow"></div>
          </div>
          <div className="flex justify-between gap-6 items-center mb-4">
            <button onClick={googleLogin} type="button" className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-2">
              <FcGoogle className="mr-2 text-2xl" />
            </button>
            <button type="button" className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-2">
              <FaMeta className="mr-2 text-2xl text-blue-500" />
            </button>
            <button type="button" className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-2">
              <FaApple className=" text-2xl" />
            </button>
          </div>
          <Link className='/'>
          <button
            className="w-[60%] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#424242] ml-[80px]"
          >
            Login
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
