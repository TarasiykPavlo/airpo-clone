import { Button, Form, Input, Spin, message } from "antd";

import { useSignup } from "./useSignup";
import "../../pages/Auth/Auth.scss";

function SignupForm({ children }) {
	const { signup, isLoading } = useSignup();

	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();

	const onFinish = ({ fullName, email, password }) => {
		signup(
			{ fullName, email, password },
			{
				onSettled: () => form.resetFields(),
				onSuccess: () => {
					messageApi.open({
						type: "success",
						duration: 5,
						content:
							"Account successfully created! Verify new account from the user's email address.",
					});
				},
				onError: (err) => {
					messageApi.open({
						type: "error",
						duration: 5,
						content: err.message,
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
					name="fullName"
					rules={[
						{
							required: true,
							message: "Please input your name!",
						},
						{
							min: 3,
							message: "Input at least 3 characters!",
						},
					]}
					style={{ width: "100%", margin: 0 }}
				>
					<Input
						type="text"
						placeholder="Name"
						className="auth__input"
						disabled={isLoading}
					/>
				</Form.Item>

				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please input valid email!",
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
						{
							min: 8,
							message: "Input at least 8 characters!",
						},
					]}
					style={{ width: "100%", marginBottom: "10px" }}
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
						htmlType="submit"
						disabled={isLoading}
					>
						{isLoading ? <Spin /> : "Sign Up"}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default SignupForm;
