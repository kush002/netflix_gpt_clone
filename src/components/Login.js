import { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInSignUpHandler = () => {
    setIsSignInForm(!isSignInForm);
  };

  const validationCheckHandler = () => {
    const message = validate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    //signUp
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/16662383?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
    //signIn

    console.log(errorMessage, isSignInForm);
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute w-3/12 p-12 bg-black text-white my-36 m-auto right-0 left-0 bg-opacity-80 rounded-md"
      >
        <h1 className="font-bold text-3xl m-2 py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Id"
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-30 rounded-md border border-slate-300"
        />

        <p className="font-bold text-red-600">{errorMessage}</p>

        <button
          className="p-3 my-6 w-full bg-red-700 rounded-md"
          onClick={validationCheckHandler}
        >
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
