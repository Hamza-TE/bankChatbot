import { useContext } from 'react';
import { UserContext } from './UserContext'; 
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="text-white">No user logged in</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl shadow-md w-full max-w-lg flex flex-col items-center">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full object-cover border-2 border-white mb-4"
        />
        <h1 className="text-xl font-bold mb-2">{user.displayName}</h1>
        <p className="text-md text-gray-700">{user.email}</p>
        <Link to="/">
          <button
            type="submit"
            className="w-[100%] py-2 mt-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#424242]"
          >
            Get Back to Gpt
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
