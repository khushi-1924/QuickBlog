import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const { axios, setToken } = useAppContext();
  const { axios } = useAppContext();
  const { navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post('/api/admin/login', { email, password });
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Check if backend sent a message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">User</span> Signup
            </h1>
            <p className="font-light">Signin and start sharing your thoughts</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter name"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>

            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>

            <div>
              <p className="text-center text-sm mb-4">
                Already a user?{" "}
                <span
                  onClick={() => navigate("/admin")}
                  className="text-primary hover:underline hover:cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
