import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Payment.scss";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import bank from "../../assets/bank.svg";
import paypal from "../../assets/paypal.svg";
import wise from "../../assets/wise.svg";
import bitcoin from "../../assets/bitcoin.svg";
import {
	ArrowLeftOutlined,
	CaretDownOutlined,
	CopyOutlined,
	CreditCardOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Select, Typography, message, theme } from "antd";
export default function Payment() {
	const [product, setProduct] = useState();
	const [peopleCount, setPeopleCount] = useState();
	const [messageShow, messageContext] = message.useMessage();
	const [moonthCount, setMoonthCount] = useState();
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			{messageContext}
			<div className="payment">
				<NavLink to={"/products"}>
					<ArrowLeftOutlined /> Back
				</NavLink>
				<div className="payment-wrap">
					<div className="payment-product-info">
						<div className="payment-method">
							<h1 className="title">PAYMENT METHOD</h1>
							<button className="payment-card">
								<div>
									<CreditCardOutlined /> Card
								</div>
								<div className="icons-group">
									<img src={visa} alt="visa" />
									<img src={mastercard} alt="mastercard" />
									<img src={bank} alt="bank" />
								</div>
							</button>
							<Select
								className="select-payment"
								popupClassName="select-dropdown"
								defaultValue={{
									value: "cryptocurrency",
									label: (
										<div>
											<span>
												<img src={bitcoin} alt="bitcoin" />
												Cryptocurrency
											</span>
											<CaretDownOutlined />
										</div>
									),
								}}
								onChange={handleChange}
								options={[
									{
										value: "Bitcoin Cash",
										label: "Bitcoin Cash",
									},
								]}
							/>
							<div className="group-banks">
								<button className="btn-bank paypal">
									<img src={paypal} alt="paypal" /> PayPal
								</button>
								<button className="btn-bank wise">
									<img src={wise} alt="wise" /> Wise
								</button>
							</div>
						</div>
						<div className="payment-product">
							<h1 className="title">PRODUCT SELECTION</h1>
							<div className="payment__product-info">
								<div className="payment__product-card">
									Product
									<Select
										defaultValue="Telegram"
										className="product-card__change-person"
										onChange={(e) => setProduct(e)}
										options={[
											{
												value: "Telegram",
												label: "Telegram",
											},
										]}
									/>
								</div>
								<div className="payment__product-card">
									Persons
									<Select
										defaultValue="1-2"
										className="product-card__change-person"
										onChange={(e) => setPeopleCount(e)}
										options={[
											{
												value: "1-2",
												label: "1-2",
											},
											{
												value: "3-4",
												label: "3-4",
											},
											{
												value: "5-9",
												label: "5-9",
											},
										]}
									/>
								</div>
								<div className="payment__product-card">
									Months
									<Select
										defaultValue="1"
										className="product-card__change-person"
										onChange={(e) => setMoonthCount(e)}
										options={[
											{
												value: "1",
												label: "1",
											},
											{
												value: "3",
												label: "3",
											},
											{
												value: "6",
												label: "6",
											},
											{
												value: "12",
												label: "12",
											},
										]}
									/>
								</div>
								<hr />
								<div className="payment__product-card bottom">
									Amount payable <p>$100.00</p>
								</div>
							</div>
							<button className="buy-product">Pay</button>
						</div>
					</div>
					<div className="payment-details">
						<h1 className="title">PRODUCT SELECTION</h1>
						<div className="payment__product-info">
							<p>Invoice for payments</p>
							<Typography className="card-copy" size="small">
								<pre>
									4114 4437 0449 4885{" "}
									<CopyOutlined
										style={{
											fontSize: "25px",
										}}
										onClick={() => {
											navigator.clipboard.writeText("4114443704494885");
											messageShow.info("Copy link!");
										}}
									/>
								</pre>
							</Typography>
						</div>
						<button className="buy-product">Check payment</button>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
	function handleChange(value) {
		console.log(`selected ${value}`);
	}
}
