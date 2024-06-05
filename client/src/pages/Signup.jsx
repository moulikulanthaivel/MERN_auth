import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

  const [error , setError] = useState(false);
  const [loading , setLoading] = useState(false);
  const [formData, setFormdata] = useState({});
  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      setLoading(false);
      if(data.success === false){
        setError(true)
        return;
      }


    } catch (error) {
      setLoading(false);
      setError(true);
      
    }
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col  gap-4 onsubmit=">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button disabled={loading} className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading? "loading..." : "sign up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 ml-1">
        <p>Have an account ? </p>
        <Link to="/sign-in">
          <span className="text-blue-600 ">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-4 ml-1" >{ error && "Something went wrong"}</p>
    </div>
  );
}

export default Signup;

// return (
//   <div className="">

//   </div>
// );
