import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/Slices/AuthSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";
// import { Link } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      dispatch(setCurrentUser(user));
      setLoginError("");
      reset();
      alert("Login successful!");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}
        <button type="submit">Login</button>
      </form>
      {/* TO DO */}
      <p>
        {/* Don't have an account? <Link to="/register">Register</Link> */}
      </p>
    </div>
  );
};

export default Login;
