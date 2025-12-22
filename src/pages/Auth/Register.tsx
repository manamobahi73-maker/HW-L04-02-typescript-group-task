import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../../components/types/userType";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/Slices/UsersSlice";
import { nanoid } from "@reduxjs/toolkit";
// import { Link } from "react-router-dom";

type RegisterFormInputs = Omit<UserType, "id">;

const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    const newUser: UserType = {
      id: nanoid(),
      ...data,
    };
    dispatch(addUser(newUser));
    reset();
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
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
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label>Role:</label>
          <select {...register("role", { required: "Role is required" })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <span>{errors.role.message}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
      {/* TO DO */}

      <p>{/* Already have an account? <Link to="/login">Login</Link> */}</p>
    </div>
  );
};

export default Register;
