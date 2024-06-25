import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl shadow-md w-full max-w-2xl" style={{ height: '530px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          <img src="https://i.postimg.cc/ZKTGpKNN/Vector.png" alt="logo" className="max-w-full w-[50px] bg-white py-2 px-2 rounded-[50%] h-auto" />
        </h2>
        <form className="w-full max-w-md flex-grow">
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <Link to="/">
            <button
              className="w-[60%] mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#424242] ml-[80px]"
            >
              Sign Up
            </button>
          </Link>
          <div className="flex items-center mb-4">
            <div className="text-[#4F4F4F] mx-4">Already have an account?</div>
            <div className="border-t border-gray-400 flex-grow"></div>
            <div className="border-t border-gray-400 flex-grow"></div>
          </div>
          <Link to="/login">
            <button
              className="w-[60%] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 ml-[80px]"
            >
              Log In
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
