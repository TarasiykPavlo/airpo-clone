import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import {
  allMouthCount,
  allPeopleCount,
  linksResponse,
  selectService,
} from "../../utils/constants";
import { useUser } from "../../features/authentication/useUser";
import { postResponseToLink } from "../../services/apiApplication";
import { useShopItems } from "../../features/authentication/useShopItems";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { data: allShopItem } = useShopItems();

  const [product, setProduct] = useState(
    location?.state?.progType || "Telegram"
  );
  const [peopleCount, setPeopleCount] = useState(
    location?.state?.peopleCount || "1-2"
  );
  const [monthCount, setMoonthCount] = useState(
    location?.state?.monthCount || 3
  );
  const [selectShopItem, setSelectShopItem] = useState(
    allShopItem
      ?.filter((permission) => permission.progType === product)
      .filter((permission) => permission.countMonths === monthCount)
      .filter((permission) => permission.countPersons === peopleCount)[0] || 0
  );
  const [useCard, setUseCard] = useState("Card");
  const [messageShow, messageContext] = message.useMessage();

  async function addPermission() {
    const link = linksResponse.activate_app;

    const codeData = {
      productId: 1,
      bankingStutus: true,
      userId: user.id,
    };

    const { status } = await postResponseToLink(codeData, link);
    console.log(status);
    navigate('/products')
  }
  function updatePrice(progType_f, countMonths_f, countPersons_f) {
    for (let i = 0; i <= allShopItem.length - 1; i++) {
      if (
        allShopItem[i].progType == progType_f &&
        allShopItem[i].countMonths == countMonths_f &&
        allShopItem[i].countPersons == countPersons_f
      ) {
        setSelectShopItem(allShopItem[i]);
      }
    }
  }

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
              <button
                className={"payment-card"}
                style={useCard == "Card" ? { backgroundColor: "#3949a9" } : {}}
                onClick={() => setUseCard("Card")}
              >
                <div>
                  <CreditCardOutlined /> Card
                </div>
                <div className="icons-group">
                  <img src={visa} alt="visa" />
                  <img src={mastercard} alt="mastercard" />
                  <img src={bank} alt="bank" />
                </div>
              </button>
              {/* <Select
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
                style={
                  useCard == "Bitcoin" ? { backgroundColor: "#24a1e0" } : {}
                }
                onChange={(e) => {
                  handleChange(e), setUseCard("Bitcoin");
                }}
				onClick={() => setUseCard("Bitcoin")}
                options={[
                  {
                    value: "Bitcoin Cash",
                    label: "Bitcoin Cash",
                  },
                ]}
              /> */}
              <button
                className={"payment-card"}
                style={
                  useCard == "Bitcoin" ? { backgroundColor: "#3949a9" } : {}
                }
                onClick={() => setUseCard("Bitcoin")}
              >
                <div
                  onClick={() => setUseCard("Bitcoin")}
                  options={[
                    {
                      value: "Bitcoin Cash",
                      label: "Bitcoin Cash",
                    },
                  ]}
                >
                  ₿ Cryptocurrency
                </div>
              </button>
              {/* <div className="group-banks">
                <button
                  className="btn-bank paypal"
                  style={
                    useCard == "Paypal" ? { backgroundColor: "#3949a9" } : {}
                  }
                  onClick={() => setUseCard("Paypal")}
                >
                  <img
                    src={paypal}
                    alt="paypal"
                    onClick={() => setUseCard("Paypal")}
                  />{" "}
                  PayPal
                </button>
                <button
                  className="btn-bank wise"
                  style={
                    useCard == "Wise" ? { backgroundColor: "#3949a9" } : {}
                  }
                  onClick={() => setUseCard("Wise")}
                >
                  <img
                    src={wise}
                    alt="wise"
                    onClick={() => setUseCard("Wise")}
                  />{" "}
                  Wise
                </button>
              </div>*/}
            </div> 
            <div className="payment-product">
              <h1 className="title">PRODUCT SELECTION</h1>
              <div className="payment__product-info">
                <div className="payment__product-card">
                  Product
                  <Select
                    defaultValue={product}
                    className="product-card__change-person"
                    onChange={(e) => {
                      setProduct(e);
                      updatePrice(e, monthCount, peopleCount);
                    }}
                    options={selectService}
                  />
                </div>
                <div className="payment__product-card">
                  Persons
                  <Select
                    defaultValue={peopleCount}
                    className="product-card__change-person"
                    onChange={(e) => {
                      setPeopleCount(e);
                      updatePrice(product, monthCount, e);
                    }}
                    options={allPeopleCount}
                  />
                </div>
                <div className="payment__product-card">
                  Months
                  <Select
                    defaultValue={monthCount}
                    className="product-card__change-person"
                    onChange={(e) => {
                      setMoonthCount(e);
                      updatePrice(product, e, peopleCount);
                    }}
                    options={allMouthCount}
                  />
                </div>
                <hr />
                <div className="payment__product-card bottom">
                  Amount payable <p>${selectShopItem?.price}</p>
                </div>
              </div>

              {(useCard == "Card" || useCard == "Bitcoin") && (
                <button className="buy-product" onClick={addPermission}>
                  Pay
                </button>
              )}
            </div>
          </div>

          {(useCard == "Paypal" || useCard == "Wise") && (
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
          )}
        </div>
      </div>
    </ConfigProvider>
  );
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
}
