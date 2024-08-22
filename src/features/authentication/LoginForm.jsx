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
  const [policyModal, setPolicyModal] = useState(false);
  const [agreementModal, setAgeementsModal] = useState(false);
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
  const handleClose = () => {
    setAgeementsModal(false);
    setPolicyModal(false);
  };
  const handleLink = () => {
    setAgeementsModal(false);
    setPolicyModal(true);
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
            onClick={() => setPolicyModal(true)}
          >
            Privacy Policy
          </span>
          <span> and </span>
          <span
            className="auth__link"
            onClick={() => setAgeementsModal(true)}
          >
            User Agreements
          </span>
        </span>
      </Form>
      <Modal
        open={policyModal}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <PrivacyPolicy />
      </Modal>
      <Modal
        open={agreementModal}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <UserAgreement handlePolicy={handleLink} />
      </Modal>
    </>
  );
}

export default LoginForm;
