import { Form, Input, message } from "antd";

import { loginUser, registerUser } from "../apicalls/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ isLoginPage }) => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    setSubmitting(true);
    if (isLoginPage) {
      // console.log("Login");
      try {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
    setSubmitting(false);
  };
  // console.log(import.meta.env.VITE_SERVER_URL);
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      <div className=" h-1/5">
        <h1 className=" font-bold text-5xl">Welcome to the Market</h1>
      </div>
      <div className="w-[450px] border-violet-400 p-4 bg-slate-100 rounded-md">
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-400">
          Point.IO - {isLoginPage ? "Login" : "Register"}
        </h2>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Name",
                },
                {
                  min: 4,
                  message: "Name must have at least 4 characters!",
                },
              ]}
            >
              <Input
                placeholder="Username..."
                className=" focus:font-bold"
              ></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Enter your Email",
              },
              {
                type: "email",
                message: "Please Enter the Valid E-mail",
              },
            ]}
          >
            <Input placeholder="Email..." className=" focus:font-bold"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Password must be filled",
              },
              {
                min: 4,
                message: "Password must be at least 4 Characters!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password..."
              className=" font-bold"
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              className="w-full outline-none bg-blue-600 text-white py-2  rounded-md"
              disabled={submitting}
            >
              {isLoginPage && !submitting && "Log In"}
              {!isLoginPage && !submitting && "Register"}
              {submitting && "Submitting"}
            </button>
          </Form.Item>
          <>
            {isLoginPage ? (
              <p className="text-center">
                Do not have an account?
                <Link
                  to={"/register"}
                  className=" ml-1 font-medium text-blue-600 hover:text-blue-800"
                >
                  Register Here!
                </Link>
              </p>
            ) : (
              <p className="text-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className=" ml-1 font-medium text-blue-500 hover:text-blue-800"
                >
                  Login Here!
                </Link>
              </p>
            )}
          </>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
