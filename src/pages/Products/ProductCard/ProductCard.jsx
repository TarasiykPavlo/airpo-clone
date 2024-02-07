import React from "react";
import { InstagramOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import './ProductCard.scss'
function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="product-card__action">-18%</div>
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
          <div className="product-card__price"><span><sup>$</sup>55</span> /mon*</div>
          <div className="product-card__price-action"><s>$60</s> <span>$165</span> in 3 months</div>
          <div className="product-card__persons">
            <Select
              defaultValue="1-2"
              className="product-card__change-person"
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
        <Button type="primary" className="product-card__btn-check-product" block>Purchased</Button>
        <Button type="primary" className="product-card__btn-check-back-card">More</Button>
        <div className="line"></div>
          <div className="product-card__subtext-info">
            Send your distribution to Gmail in just two clicks! Forget about
            hassles with settings - with us it’s simple, fast and effective.
            Your message will reach your customers instantly, making your
            communication as effective as possible.
          </div>
      </div>
    </div>
  );
}

export default ProductCard;
