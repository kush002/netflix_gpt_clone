import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const signInSignUpHandler = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/3417bf9a-0323-4480-84ee-e1cb2ff0966b/IN-en-20240408-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="backgroung_img"
        />
      </div>
      <form className="absolute w-3/12 p-12 bg-black text-white my-36 m-auto right-0 left-0 bg-opacity-80 rounded-md">
        <h1 className="font-bold text-3xl m-2 py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
          />
        )}
        <input
          type="text"
          placeholder="Email Id"
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
        />
        <input
          type="passwrd"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
        />
        <button className="p-3 my-6 w-full bg-red-700 rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm ? (
          <p className=" font-medium cursor-pointer my-4  ">
            <span className="text-gray-400 font-normal"> New to Netflix? </span>
            <span className="hover:underline" onClick={signInSignUpHandler}>
              Sign Up now.
            </span>
          </p>
        ) : (
          <p className=" font-medium cursor-pointer my-4  ">
            <span className="text-gray-400 font-normal">
              {" "}
              Already Registered?{" "}
            </span>
            <span className="hover:underline" onClick={signInSignUpHandler}>
              Sign In now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
