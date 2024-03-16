import { useState } from "react";
import { Button, Checkbox, Form, Input, Spin, Modal, message } from "antd";

import { useSignup } from "./useSignup";
import "../../pages/Auth/Auth.scss";
import { useParams } from "react-router-dom";

function SignupForm({ children }) {
  const { signup, isLoading } = useSignup();
  const { refid } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
	const [isTermsAccepted, setIsTermsAccepted] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onFinish = ({ refLink, fullName, email, password }) => {
		if (!isTermsAccepted) {
			messageApi.open({
				type: "error",
				duration: 5,
				content: "You must accept the terms to continue!",
			});
			return;
		}

		signup(
			{ refLink, fullName, email, password },
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

	const handleOk = () => {
		setIsModalOpen(false);
		setIsTermsAccepted(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsTermsAccepted(false);
	};

	return (
		<>
			{contextHolder}

      <Form
        form={form}
        onFinish={
          (e) =>
            onFinish({
              refid,
              fullName: e.fullName,
              email: e.email,
              password: e.password,
            })
          //
        }
        autoComplete="off"
      >
        {children}
        {/* <Form.Item name="refLink" style={{ height: "0px", margin: 0 }}>
          <Input
            type="text"
            value={refid}            
            style={{
              backgroundColor: "transparent",
              color: "transparent",
              border: "none",
              outline: "none",
              caretColor: "transparent",
              fontSize: 0,
              width: "100px", // Змініть на потрібне значення
              height: "20px", // Змініть на потрібне значення
            }}
          />
        </Form.Item> */}

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
					valuePropName="checked"
					style={{
						width: "100%",
						display: "grid",
						placeItems: "center",
						marginBottom: "5px",
					}}
				>
					<Checkbox
						disabled={isLoading}
						checked={isTermsAccepted}
						onChange={() => setIsTermsAccepted((state) => !state)}
					/>
					<span className="auth__checkbox">
						I accept all terms of the{" "}
						<span className="auth__link" onClick={() => setIsModalOpen(true)}>
							user agreement
						</span>
					</span>
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

			<Modal
				title="User agreement"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				style={{ textAlign: "center" }}
			>
				<ol className="auth__policy-list">
					<li>
						<h2>ПРЕДМЕТ СОГЛАШЕНИЯ</h2>
						<p>
							1.1 Настоящее Соглашение предоставляет Клиенту доступ к
							веб-сервису (далее - Сервис) и регулирует условия его
							использования.
						</p>
					</li>
					<li>
						<h2>КОНФИДЕНЦИАЛЬНОСТЬ ИНФОРМАЦИИ</h2>
						<p>
							2.1 Клиент признает, что любая информация, предоставленная им при
							использовании Сервиса, является конфиденциальной и остается его
							собственностью.
						</p>
						<p>
							2.2 Поставщик обеспечивает конфиденциальность информации Клиента и
							не разглашает ее третьим лицам без предварительного письменного
							согласия Клиента, за исключением случаев, предусмотренных
							законодательством.
						</p>
					</li>
					<li>
						<h2>ИСПОЛЬЗОВАНИЕ ИНФОРМАЦИИ</h2>
						<p>
							3.1 Информация, предоставленная Клиентом, используется Поставщиком
							исключительно в целях предоставления доступа к Сервису и улучшения
							его качества.
						</p>
						<p>
							3.2 Поставщик не использует информацию Клиента в целях, не
							связанных с оказанием услуг, предусмотренных настоящим
							Соглашением, без предварительного согласия Клиента.
						</p>
					</li>
					<li>
						<h2>ПРИНЯТИЕ СОГЛАШЕНИЯ</h2>
						<p>
							4.1 Нажатие кнопки Принять или использование Сервиса подтверждает
							ваше ознакомление с настоящим соглашением, понимание его условий и
							согласие с ними.
						</p>
					</li>
				</ol>
				<p className="auth__thanks">Благодарим за доверие и использование нашего Сервиса!</p>
			</Modal>
		</>
	);
}

export default SignupForm;
