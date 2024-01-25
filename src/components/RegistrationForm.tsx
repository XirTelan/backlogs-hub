"use client";
import React from "react";
import { useForm } from "react-hook-form";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => console.log(data);

  return (
    <form className="text-lg" onSubmit={handleSubmit(handleRegistration)}>
      <div>
        <label>User Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && "errorrs"}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
      </div>
      <div>
        <label>Password</label>
        <input
          className="text-red-900"
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "invalid password ",
            },
          })}
        />

        {errors.password && <p role="alert">{errors.password?.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
