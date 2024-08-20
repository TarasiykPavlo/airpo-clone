import { Button, Form, Input, Spin, message, Modal } from "antd";

import { useLogin } from "./useLogin";
import "../../pages/Auth/Auth.scss";
import { useState } from "react";
import UserAgreement from "../../pages/UserAgreement/UserAgreement";
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy";

function LoginForm({ children }) {
  const { login, isLoading } = useLogin();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = ({ email, password }) => {
    login(
      { email, password },
      {
        onSettled: () => form.resetFields(),
        onError: () => {
          messageApi.open({
            type: "error",
            content: "Provided email or password are incorrect",
          });
        },
      }
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}

      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        {children}

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          style={{ width: "100%", margin: 0 }}
        >
          <Input
            type="email"
            placeholder="Email"
            className="auth__input"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          style={{ width: "100%", margin: 0 }}
        >
          <Input.Password
            type="password"
            placeholder="Password"
            className="auth__input"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          style={{
            width: "100%",
            display: "grid",
            placeItems: "center",
            marginBottom: 0,
          }}
        >
          <Button
            ghost={isLoading}
            type="primary"
            shape="round"
            size="large"
            className="auth__button"
            disabled={isLoading}
            htmlType="submit"
          >
            {isLoading ? <Spin /> : "Log In"}
          </Button>
        </Form.Item>
        <span
          className="auth__checkbox"
          style={{
            width: "100%",
            paddingTop: "20px",
            placeItems: "center",
            marginBottom: "5px",
          }}
        >
          I accept all terms of the{" "}
          <span
            className="auth__link"
            onClick={() => setIsModalOpen(true)}
          >
            user agreement and privacy policy
          </span>
        </span>
      </Form>
      <Modal
        title="User agreement"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // style={{ textAlign: "center" }}
      >
        {" "}
        <UserAgreement></UserAgreement>
        <PrivacyPolicy></PrivacyPolicy>
      </Modal>
    </>
  );
}

export default LoginForm;
