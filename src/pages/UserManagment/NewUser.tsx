import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../../components/types/userType";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/Slices/UsersSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

type RegisterFormInputs = Omit<UserType, "id">;

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    alert('member added successfully!')
    setTimeout(() => {
      navigate("/users");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Add New Member</h2>
         
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
               <option value="user">Member (Normal)</option>
            <option value="admin">Manager (Admin)</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.role.message}
                </span>
              )}
            </div>

             <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex-1">
                Add User
            </button>
            <button type="button" onClick={() => navigate("/users")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex-1">
                Cancel
            </button>
        </div>
          </form>

    
        </div>
     
      </div>
    </div>
  );
};

export default NewUser;
