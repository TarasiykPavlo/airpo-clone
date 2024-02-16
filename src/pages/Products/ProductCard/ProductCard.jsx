import { useState } from "react";
import { Button, Select } from "antd";
import { InstagramOutlined } from "@ant-design/icons";

import check from "./../../../assets/check.svg";

import "./ProductCard.scss";

function ProductCard({ data, currency, changeCardSide, setChangeCardSide }) {
  const [peopleCount, setPeopleCount] = useState("1-2");

  const currencyIcon =
    currency === "USD"
      ? "$"
      : currency === "EUR"
      ? "€"
      : currency === "UAH"
      ? "₴"
      : "";

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
                <InstagramOutlined />
              </div>
              <div className="product-card__name-product">Telegram</div>
            </div>
            <div className="product-card__subtitle">
              Distributions in Telegram: simple, fast, effective!
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
          <Button
            type="primary"
            danger
            className="product-card__btn-check-product purchased"
            block
          >
            Purchased
          </Button>
          <Button
            type="primary"
            className="product-card__btn-check-back-card"
            onClick={() => setChangeCardSide(true)}
          >
            More
          </Button>
          <div className="line"></div>
          <div className="product-card__subtext-info">
            Send your distribution to Gmail in just two clicks! Forget about
            hassles with settings - with us it’s simple, fast and effective.
            Your message will reach your customers instantly, making your
            communication as effective as possible.
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
              <div className="product-card__name-product">Telegram</div>
            </div>
            <div className="product-card__subtitle">
              <p>
                This is a simple and convenient messenger that holds leading
                positions in the market. Make your business easier with
                automated broadcasts!
              </p>
              <p>
                Telegram is a vast ocean with fish, and we are confident to say
                that we have created that very fishing rod that saves your time
                and money.
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
          <Button
            type="primary"
            danger
            className="product-card__btn-check-product"
            block
          >
            Proceed to Payment
          </Button>
          <Button
            type="primary"
            className="product-card__btn-check-back-card"
            onClick={() => setChangeCardSide(false)}
          >
            More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
