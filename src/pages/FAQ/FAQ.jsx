import React from "react";
import "./FAQ.scss";
import { Collapse, ConfigProvider, theme } from "antd";
export default function FAQ() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				components: {
					Collapse: {
						colorTextHeading: "#fff",
						colorText: "#d9dadb",
						fontSize: "21px",
					},
				},
			}}
		>
			<div className="faq">
				<Collapse ghost defaultActiveKey={["1"]} bordered={false}>
					<h1>Basic questions</h1>
					<Collapse.Panel
						showArrow={false}
						header="1. What is the referral system?"
						key="1"
					>
						<p>
							Every client can invite a friend to register and receive bonuses
							in the form of the internal currency, AiCoin. These coins can be
							used to purchase new applications on our site or, in the future,
							be withdrawn as real money. For every invited person who makes
							purchases on our site, you will receive 10% of the amount of their
							purchases in AiCoin.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="2. How do tariffs differ when choosing the number of people?"
						key="2"
					>
						<p>
							Our site offers various tariff plans suitable for both individual
							users and large organizations. The main difference between these
							tariffs is the maximum number of companies you can create and
							launch. The choice of tariff depends on your needs: if you need to
							launch a large number of companies, it is recommended to choose a
							tariff with a higher limit. This gives you flexibility in project
							management and allows you to scale your business according to
							growing needs. When choosing a tariff, it is important to consider
							not only current tasks but also future plans to ensure
							uninterrupted operation and development of your projects.
						</p>
					</Collapse.Panel>
					<h1>Technical Questions</h1>
					<Collapse.Panel
						showArrow={false}
						header="1. What to do if you have difficulties with payment?"
						key="3"
					>
						<p>
							If you encounter any difficulties when trying to make a payment on
							our site, we are ready to provide all necessary support. Please
							send a message to our support email address -
							<b> support@ai-pro.company</b>, describing the problem you
							encountered. Our support team will promptly process your request
							and provide an individual solution to resolve payment issues,
							allowing you to use our services without obstacles.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="2. What are companies?"
						key="4"
					>
						<p>
							In the context of our service, a "company" represents a single
							Telegram account configured to send messages to groups or
							individual users' messages. It is the primary unit of our system
							through which interaction with the audience is carried out. Each
							company can be individually configured for your marketing and
							communication tasks.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="3. What to do if the code did not come in Telegram?"
						key="5"
					>
						<p>
							If you did not receive a confirmation code in Telegram, the first
							step is to check the correctness of the phone number you provided.
							Make sure the number is entered correctly and corresponds to your
							region's format. If the number is correct but the problem
							persists, please contact our support service at
							<b> support@ai-pro.company</b>. We will promptly consider your
							request and help you solve the problem so that you can continue
							using our services without delays.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="4. What are API ID and API HASH?"
						key="6"
					>
						<p>
							These are unique identifiers provided by Telegram for secure
							access of your bot to the platform. Their main task is to reduce
							the risk of blocking the company during distribution.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="5. How to get API ID and API HASH?"
						key="7"
					>
						<p>
							To obtain API ID and API HASH from Telegram, follow these steps:
							Go to the Telegram website at{" "}
							<a href="https://my.telegram.org">https://my.telegram.org</a> and
							log into your account. Open the "API development tools" section
							and follow the instructions to fill out the application
							registration form. After filling out the form, you will receive
							API ID and API HASH. These data will be required to set up your
							company and reduce the risk of blocking your account.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="6. What to do if you cannot create a new group?"
						key="8"
					>
						<p>
							If you encounter difficulties or errors when trying to create a
							new group in Telegram, do not hesitate to seek help from our
							support service. To do this, send an email to
							<b> support@ai-pro.company</b> describing the problem, and our
							team will contact you to provide a solution. We will promptly
							consider your request and help you solve the problem so that you
							can continue using our services without delays.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="7. How does priority affect distribution in my groups?"
						key="9"
					>
						<p>
							When setting up distribution, you can set a priority for each of
							the added chats using a scale from 1 to 10, where 10 indicates the
							highest priority. This allows you to control the sequence in which
							groups will receive messages: groups with higher priority will be
							processed earlier. Thus, you can strategically plan the order of
							distribution so that key chats receive information first.
						</p>
					</Collapse.Panel>
					<h1>Usage Questions</h1>
					<Collapse.Panel
						showArrow={false}
						header="1. Why indicate the region and category when registering a company?"
						key="10"
					>
						<p>
							Indicating the region and category when creating your company
							allows for more targeted distributions. It helps you better
							understand and choose the audience you want to attract with your
							messages. As a result, we can offer you a list of groups most
							suitable for your advertising campaign, increasing the
							effectiveness of your distributions and helping you achieve
							desired results.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="2. How to add your group?"
						key="11"
					>
						<p>
							To add your group to the system, you need to go to your company's
							settings and select the "Groups Settings" section. In this
							section, you will find the "Add new group" button. Click on it and
							enter the necessary information about your group. You will also
							need to set a priority for the group, which will determine its
							place in the sequence of distributions.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="3. How to view the progress of message sending?"
						key="12"
					>
						<p>
							To track the progress of your message sending, go to your
							company's settings page and select the statistics icon. In this
							section, you will find detailed information about the course of
							the distribution, including the number of successfully sent and
							failed messages, the total number of messages planned for sending,
							and how many of them are left to send. Additionally, there is a
							console for error output, which will help you understand the
							reasons for possible failures in sending messages.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="4. What is a template in company settings?"
						key="13"
					>
						<p>
							A template in your company's settings is a pre-configured setup
							for distributions, where you personally specify the message text,
							while other parameters, including sending intervals, are already
							optimized in accordance with the anti-spam system to minimize the
							risk of account blocking. This allows you to customize the content
							of your messages for various purposes, making it easier to launch
							effective distributions while considering anti-spam measures.
						</p>
					</Collapse.Panel>
					<Collapse.Panel
						showArrow={false}
						header="5. What do message sending interval, delay between mailings, and start before mailing mean?"
						key="14"
					>
						<p>
							<b>The message sending interval</b> determines the frequency with
							which messages will be sent to each of the groups added to the
							distribution. This allows you to control the intensity of
							communication with the audience. This delay may also vary slightly
							to adapt to anti-spam measures. <b>The delay between mailings </b>
							sets the time interval between consecutive distribution cycles,
							helping to avoid excessive load on recipients and reduce the risk
							of negative perception of messages. This delay can also vary
							slightly to adapt to anti-spam measures.
							<b>Start before mailing </b>
							indicates the time at which the bot will start distribution after
							activation. This parameter allows for precise planning of the
							campaign's start according to your tasks.
						</p>
					</Collapse.Panel>
					<h1>Additional questions</h1>
					<Collapse.Panel
						showArrow={false}
						header="1. Where to buy a Telegram account?"
						key="15"
					>
						<p>
							It's possible to purchase a Telegram account through various
							third-party platforms that specialize in providing such services.
							Examples of these platforms might include sites like zelenka{" "}
							<a href="https://lzt.market/telegram/">
								(https://lzt.market/telegram/)
							</a>{" "}
							and similar. It's important to note that our organization is not
							affiliated with the operations of these services and does not act
							as their partner or affiliate. Accordingly, we do not assume any
							responsibility for the quality of the services they offer and
							cannot guarantee the security and reliability of the transactions
							made through them. In case of any questions or problems related to
							purchasing accounts through these platforms, we recommend
							contacting the representatives of the respective services
							directly.
						</p>
					</Collapse.Panel>
				</Collapse>
			</div>
		</ConfigProvider>
	);
}
