import {
  Button,
  Form,
  Input,
  Spin,
  message,
  Checkbox,
  InputNumber,
} from "antd";

import { useSignup } from "./useSignup";
import "../../pages/Auth/Auth.scss";

function SignupForm({
  children,
}) {
  const {
    signup,
    isLoading,
  } = useSignup();

  const [form] =
    Form.useForm();
  const [
    messageApi,
    contextHolder,
  ] =
    message.useMessage();
  const { TextArea } =
    Input;
  const onFinish = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      {
        fullName,
        email,
        password,
      },
      {
        onSettled: () =>
          form.resetFields(),
        onSuccess:
          () => {
            messageApi.open(
              {
                type: "success",
                duration: 5,
                content:
                  "Account successfully created! Verify new account from the user's email address.",
              }
            );
          },
        onError: err => {
          messageApi.open(
            {
              type: "error",
              duration: 5,
              content:
                err.message,
            }
          );
        },
      }
    );
  };

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        onFinish={
          onFinish
        }
        autoComplete="off"
      >
        {children}

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message:
                "Please input valid email!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="email"
            placeholder="Email"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message:
                "Please input your name!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Name"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message:
                "Please input your password!",
            },
            {
              min: 8,
              message:
                "Input at least 8 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            marginBottom:
              "10px",
          }}
        >
          <Input.Password
            type="password"
            placeholder="Password"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>

        <Form.Item
          name="password2"
          dependencies={[
            "password",
          ]}
          style={{
            width:
              "100%",
            marginBottom:
              "10px",
          }}
          rules={[
            {
              required: true,
              message:
                "Please confirm your password!",
            },

            ({
              getFieldValue,
            }) => ({
              validator(
                _,
                value
              ) {
                if (
                  !value ||
                  getFieldValue(
                    "password"
                  ) ===
                    value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The new password that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Confirm Password"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>

        <Form.Item
          name="CompanyName"
          rules={[
            {
              required: false,
              message:
                "Please input your Company name!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Company name"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="NickName"
          rules={[
            {
              required: true,
              message:
                "Please input your Nickname!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Nickname"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="FullName"
          rules={[
            {
              required: true,
              message:
                "Please input your Full name!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Full name"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message:
                "Please input your phone number!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="number"
            placeholder="Phone number"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>

        <Form.Item
          style={{
            width:
              "100%",
            display:
              "grid",
            placeItems:
              "center",
            marginBottom: 0,
          }}
        >
          <p>
            Traffic
            sources
          </p>
          <Checkbox>
            Site
          </Checkbox>
          <br />
          <Checkbox>
            Social
            network
          </Checkbox>
          <h2>
            Aрбитраж
          </h2>
          <ul>
            <Checkbox>
              Платний
              метод
            </Checkbox>
            <br />
            <Checkbox>
              УБТ
            </Checkbox>
          </ul>
          <Checkbox>
            Direct usage
          </Checkbox>
          <br />

          <Form.Item>
            <Checkbox>
              other
            </Checkbox>
            <TextArea
              rows={4}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="Discord"
          rules={[
            {
              required: true,
              message:
                "Please input your Full name!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Discord"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="Telegram"
          rules={[
            {
              required: true,
              message:
                "Please input your Full name!",
            },
            {
              min: 3,
              message:
                "Input at least 3 characters!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="text"
            placeholder="Telegram"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Form.Item
          name="contactEmail"
          rules={[
            {
              required: true,
              type: "email",
              message:
                "Please input valid email!",
            },
          ]}
          style={{
            width:
              "100%",
            margin: 0,
          }}
        >
          <Input
            type="email"
            placeholder="Contact Email"
            className="auth__input"
            disabled={
              isLoading
            }
          />
        </Form.Item>
        <Button
          ghost={
            isLoading
          }
          type="primary"
          shape="round"
          size="large"
          className="auth__button"
          htmlType="submit"
          disabled={
            isLoading
          }
        >
          {isLoading ? (
            <Spin />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>
    </>
  );
}

export default SignupForm;
