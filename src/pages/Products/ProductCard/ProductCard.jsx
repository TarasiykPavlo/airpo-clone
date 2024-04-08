import { useState } from "react";
import { Button, Select, Modal } from "antd";
import { InstagramOutlined } from "@ant-design/icons";

import check from "./../../../assets/check.svg";
import TeleramIcon from "./../../../assets/TelegramIcon.png";

import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";

function ProductCard({
  productProgType,
  data,
  currency,
  PermissionsData,
  checkedBtnMoonth,
}) {
  const navigate = useNavigate();
  const onlySelectPermission = PermissionsData?.filter(
    (permission) => permission.progType === productProgType
  );
  const [changeCardSide, setChangeCardSide] = useState(false);
  const [peopleCount, setPeopleCount] = useState("1-2");

  const [isModal, setIsModal] = useState(false);

  const currencyIcon =
    currency === "USD"
      ? "$"
      : currency === "EUR"
      ? "€"
      : currency === "UAH"
      ? "₴"
      : "";

  function handleOk() {}
  return (
    <div
      className={`product-card-wrapper ${changeCardSide ? "is-flipped" : ""}`}
    >
      <div className="product-card front">
        {!data.range[peopleCount].action ? (
          ""
        ) : (
          <div className="product-card__action">
            -{data.range[peopleCount].action}%
          </div>
        )}
        <div className="product-card__wrap">
          <div className="product-card__head">
            <div className="product-card__title">
              <div className="icon">
                {productProgType == "Telegram" ? (
                  <img src={TeleramIcon} style={{ height: "25px" }} />
                ) : (
                  <InstagramOutlined />
                )}
              </div>
              <div className="product-card__name-product">
                {productProgType}
              </div>
            </div>
            <div className="product-card__subtitle">
              Distributions in {productProgType}: simple, fast, effective!
            </div>
          </div>
          <div className="product-card__info-price">
            <div className="product-card__price">
              <span>
                <sup>{currencyIcon}</sup>
                {data.range[peopleCount].priceMoonth}
              </span>
              /mon*
            </div>
            {data.months === "1 month" ? (
              ""
            ) : (
              <div className="product-card__price-action">
                <s>
                  {currencyIcon}
                  {data.range[peopleCount].price}
                </s>
                <span>
                  {currencyIcon}
                  {data.range[peopleCount].priceAction}
                </span>
                in {data.months}
              </div>
            )}
            <div className="product-card__persons">
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
              Persons
            </div>
          </div>
          {onlySelectPermission == 0 ? (
            <Button
              type="primary"
              danger
              className="product-card__btn-check-product"
              style={{ background: "#F98B25" }}
              block
              onClick={
                () => setIsModal(true)
                // navigate("/payment", {
                //   state: {
                //     progType: productProgType,
                //     monthCount: checkedBtnMoonth,
                //     peopleCount: peopleCount
                //   },
                // })
              }
            >
              Buy now
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              className="product-card__btn-check-product purchased"
              block
            >
              Purchased
            </Button>
          )}
          <Button
            type="primary"
            className="product-card__btn-check-back-card"
            onClick={() => setChangeCardSide(true)}
          >
            More
          </Button>
          <div className="line"></div>
          <div className="product-card__subtext-info">
            Create Telegram mailing in just two clicks! Forget about the hassle
            of settings - with us, it's easy, fast, and effective. Your messages
            will reach customers instantly, making your communication highly
            efficient.
          </div>
        </div>
      </div>

      <div className="product-card back">
        <div className="product-card__wrap back">
          <div className="product-card__head">
            <div className="product-card__title">
              <div className="icon">
                <InstagramOutlined />
              </div>
              <div className="product-card__name-product">
                {productProgType}
              </div>
            </div>
            <div className="product-card__subtitle">
              <p>
                This is a simple and convenient messenger that holds leading
                positions in the market. Make your business easier with
                automated broadcasts!
              </p>
              <p>
                {productProgType} is a vast ocean with fish, and we are
                confident to say that we have created that very fishing rod that
                saves your time and money.
              </p>
            </div>
          </div>
          <div className="line"></div>
          <ul className="list-advantages">
            <li className="list-advantages-item head">
              Key Features
              <span>All-in-One</span>
            </li>
            <li className="list-advantages-item">
              Potential Customers
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Engaged Traffic
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Increase in Sales
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Time Savings
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Mailing to various chat rooms
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Huge database of chat rooms
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Custom Program Settings
              <span>
                <img src={check} />
              </span>
            </li>
            <li className="list-advantages-item">
              Ease of Use
              <span>
                <img src={check} />
              </span>
            </li>
          </ul>
          <div className="line"></div>

          {onlySelectPermission == 0 ? (
            <Button
              type="primary"
              danger
              className="product-card__btn-check-product"
              style={{ background: "#F98B25" }}
              onClick={() =>
                navigate("/payment", {
                  state: {
                    progType: productProgType,
                    monthCount: data,
                    peopleCount: peopleCount,
                  },
                })
              }
              block
            >
              Buy now
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              className="product-card__btn-check-product"
              block
            >
              Proceed to Payment
            </Button>
          )}
          <Button
            type="primary"
            className="product-card__btn-check-back-card"
            onClick={() => setChangeCardSide(false)}
          >
            More
          </Button>
        </div>
      </div>
      <Modal
        title=""
        open={isModal}
        style={{padding: "5rem"}}
        centered
        footer={(_, {}) => (
          <>
            <Button
              className="product-card__btn-check-product"
              style={{ width: "100%", height: "4rem", fontSize: "2rem"}}
              onClick={() =>
                window.open("https://t.me/aipro_manager", "_blank")
                //window.location.replace("https://t.me/aipro_manager")
              }
            >
              Go to telegram
            </Button>
          </>
        )}
        //onOk={handleOk}
        onCancel={() => setIsModal(false)}
      >
        <h1>To make a purchase, contact our manager on Telegram💌</h1>
      </Modal>
    </div>
  );
}

export default ProductCard;
