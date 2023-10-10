import { Form, Input, Button, message } from "antd";

import{registerUser} from "../apicalls/auth"

const AuthForm = ({ isLoginPage }) => {



  const handOnFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.isSuccess) {
        message.success(response.message)
      } else {
        throw new Error(response.message)
      }
    }
    catch (error) {
      message.error(error.message)
    }
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[450px] border-violet-400 p-4 bg-slate-100 rounded-md">
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-400">
          Point.IO - {isLoginPage ? "Login" : "Register"}
        </h2>
        <Form layout="vertical" onFinish={handOnFinish}>
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
            <Button className="w-full outline-none bg-blue-600 text-white rounded-md">
              {isLoginPage ? "Log in" : " Register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
