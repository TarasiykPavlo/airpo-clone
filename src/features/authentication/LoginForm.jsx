import { Button, Form, Input, Spin, message } from "antd";

import { useLogin } from "./useLogin";
import "../../pages/Auth/Auth.scss";

function LoginForm({ children }) {
	const { login, isLoading } = useLogin();

	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();

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

	return (
		<>
			{contextHolder}

			<Form form={form} onFinish={onFinish} autoComplete="off">
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
			</Form>
		</>
	);
}

export default LoginForm;
