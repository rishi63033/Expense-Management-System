import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      {loading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : user ? (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">👤 User Profile</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p className="break-words">
              <strong>MongoDB ID:</strong> {user._id}
            </p>
            <p>
              <strong>Joined On:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
}

export default Profile;
