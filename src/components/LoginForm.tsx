import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div className="flex flex-col">
        <label>Login</label>
        <input type="text" />
      </div>
      <div className="flex flex-col">
        <label>Password</label>
        <input type="text" />
      </div>
      <button type="submit">Log In</button>
    </div>
  );
};

export default LoginForm;
