import React from "react";
import "./Products.scss";
import { ConfigProvider, Select, theme } from "antd";
import ProductCard from "./ProductCard/ProductCard";
function Products(props) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
     <div className="products">
        <div className="products__header">
          <div className="title">Our products</div>
          <div className="products__moonths-change">
            <ul className="product__list-moonths-change">
              <li className="products__moonths-chang-item">1 month</li>
              <li className="products__moonths-chang-item">3 month</li>
              <li className="products__moonths-chang-item">6 month</li>
              <li className="products__moonths-chang-item">12 month</li>
            </ul>
            <Select
      defaultValue="$ USD"
      className="products__change-currency"
      options={[
        {
          value: '$ USD',
          label: '$ USD',
        },
        {
          value: '€ EUR',
          label: '€ EUR',
        },
        {
          value: '₴ UAH',
          label: '₴ UAH',
        },
      ]}
    />
          </div>
        </div>
        <div className="products__wrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Products;
