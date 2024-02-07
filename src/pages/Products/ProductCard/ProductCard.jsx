import React from "react";
import { InstagramOutlined } from "@ant-design/icons";
import { Select } from "antd";

import './ProductCard.scss'
function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="product-card__action"></div>
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
          <div className="product-card__price"></div>
          <div className="product-card__price-action"></div>
          <div className="product-card__persons">
            <Select
              defaultValue="1-2"
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
        <div className="product-card__btn-check-product">
          <div className="line"></div>
          <div className="product-card__subtext-info">
            Send your distribution to Gmail in just two clicks! Forget about
            hassles with settings - with us it’s simple, fast and effective.
            Your message will reach your customers instantly, making your
            communication as effective as possible.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
