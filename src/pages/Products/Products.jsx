import { useEffect, useState } from "react";
import { ConfigProvider, Select, theme } from "antd";

import ProductCard from "./ProductCard/ProductCard";
import { productCard } from "../../utils/constants";

import "./Products.scss";
import { usePermissionsData } from "../../features/authentication/useClientPermissionsData";
import { useUser } from "../../features/authentication/useUser";

function Products() {
  const progType = ["Telegram"];
  const [checkedBtnMoonth, setCheckedBtnMoonth] = useState(3);
  const [currency, setCurrency] = useState("USD");
  const { user } = useUser();
  const { data: PermissionsData } = usePermissionsData(user.id);



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
              <label className="products__moonths-chang-item">
                <input
                  type="radio"
                  name="moonth"
                  id="one-moonth"
                  onChange={() => setCheckedBtnMoonth(1)}
                  checked={checkedBtnMoonth === 1}
                />
                <li>
                  <span>1 moonth</span>
                </li>
              </label>
              <label className="products__moonths-chang-item">
                <input
                  type="radio"
                  name="moonth"
                  id="three-moonth"
                  onChange={() => setCheckedBtnMoonth(3)}
                  checked={checkedBtnMoonth === 3}
                />
                <li>
                  <span>3 moonth</span>
                </li>
              </label>
              <label className="products__moonths-chang-item">
                <input
                  type="radio"
                  name="moonth"
                  id="six-moonth"
                  onChange={() => setCheckedBtnMoonth(6)}
                  checked={checkedBtnMoonth === 6}
                />
                <li>
                  <span>6 moonth</span>
                </li>
              </label>
              <label className="products__moonths-chang-item">
                <input
                  type="radio"
                  name="moonth"
                  id="twelve-moonth"
                  onChange={() => setCheckedBtnMoonth(12)}
                  checked={checkedBtnMoonth === 12}
                />
                <li>
                  <span>12 moonth</span>
                </li>
              </label>
            </ul>
            <Select
              defaultValue="$ USD"
              className="products__change-currency"
              onChange={(e) => setCurrency(e)}
              options={[
                {
                  value: "USD",
                  label: "$ USD",
                },
                {
                  value: "EUR",
                  label: "€ EUR",
                },
                {
                  value: "UAH",
                  label: "₴ UAH",
                },
              ]}
            />
          </div>
        </div>
        <div className="products__wrap">
          {progType.map((e, index) => (
            <ProductCard
              key={index}
              productProgType={e}
              data={productCard[currency][checkedBtnMoonth]}
              checkedBtnMoonth={checkedBtnMoonth}
              currency={currency}
              PermissionsData={PermissionsData}
            />
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Products;
