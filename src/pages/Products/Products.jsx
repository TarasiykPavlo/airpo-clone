import React, { useState } from "react";
import "./Products.scss";
import { ConfigProvider, Select, theme } from "antd";
import ProductCard from "./ProductCard/ProductCard";
function Products() {
  const [localStateProductCard, setLocalStateProductCard] = useState({
    USD: {
      1: {
        range: {
          '1-2': {
            priceMoonth: 15,
          },
          '3-4': {
            priceMoonth: 20,
          },
          '5-9': {
            priceMoonth: 30,
          },
        },
        months: '1 month'
      },
      3: {
        range: {
          '1-2': {
            priceMoonth: 13,
            price: 45,
            priceAction: 39,
            action: 11
          },
          '3-4': {
            priceMoonth: 18,
            price: 60,
            priceAction: 54,
            action: 8
          },
          '5-9': {
            priceMoonth: 26,
            price: 90,
            priceAction: 78,
            action: 13
          },
        },
        months: '3 months'
      },
      6: {
        range: {
          '1-2': {
            priceMoonth: 11,
            price: 90,
            priceAction: 66,
            action: 25
          },
          '3-4': {
            priceMoonth: 14,
            price: 120,
            priceAction: 84,
            action: 30
          },
          '5-9': {
            priceMoonth: 20,
            price: 180,
            priceAction: 120,
            action: 32
          },
        },
        months: '6 months'
      },
      12: {
        range: {
          '1-2': {
            priceMoonth: 8,
            price: 145,
            priceAction: 96,
            action: 45
          },
          '3-4': {
            priceMoonth: 11,
            price: 240,
            priceAction: 132,
            action: 45
          },
          '5-9': {
            priceMoonth: 17,
            price: 360,
            priceAction: 200,
            action: 45
          },
        },
        months: '12 months'
      }
    },
    EUR: {
      1: {
        range: {
          '1-2': {
            priceMoonth: 14,
          },
          '3-4': {
            priceMoonth: 19,
          },
          '5-9': {
            priceMoonth: 28,
          },
        },
        months: '1 month'
      },
      3: {
        range: {
          '1-2': {
            priceMoonth: 12,
            price: 42,
            priceAction: 36,
            action: 11
          },
          '3-4': {
            priceMoonth: 16,
            price: 55,
            priceAction: 49,
            action: 8
          },
          '5-9': {
            priceMoonth: 24,
            price: 83,
            priceAction: 72,
            action: 13
          },
        },
        months: '3 months'
      },
      6: {
        range: {
          '1-2': {
            priceMoonth: 10,
            price: 83,
            priceAction: 61,
            action: 25
          },
          '3-4': {
            priceMoonth: 13,
            price: 110,
            priceAction: 77,
            action: 30
          },
          '5-9': {
            priceMoonth: 18,
            price: 166,
            priceAction: 110,
            action: 32
          },
        },
        months: '6 months'
      },
      12: {
        range: {
          '1-2': {
            priceMoonth: 7,
            price: 134,
            priceAction: 88,
            action: 45
          },
          '3-4': {
            priceMoonth: 10,
            price: 220,
            priceAction: 122,
            action: 45
          },
          '5-9': {
            priceMoonth: 15,
            price: 332,
            priceAction: 185,
            action: 45
          },
        },
        months: '12 months'
      }
    },
    UAH: {
      1: {
        range: {
          '1-2': {
            priceMoonth: 670,
          },
          '3-4': {
          priceMoonth: 760,
        },
          '5-9': {
            priceMoonth: 1140,
          },
        },
        months: '1 month'
      },
      3: {
        range: {
          '1-2': {
            priceMoonth: 495,
            price: 1705,
            priceAction: 1477,
            action: 11
          },
          '3-4': {
            priceMoonth: 685,
            price: 2272,
            priceAction: 2045,
            action: 8
          },
          '5-9': {
            priceMoonth: 990,
            price: 3410,
            priceAction: 2955,
            action: 13
          },
        },
        months: '3 months'
      },
      6: {
        range: {
          '1-2': {
            priceMoonth: 420,
            price: 3410,
            priceAction: 2500,
            action: 25
          },
          '3-4': {
            priceMoonth: 530,
            price: 4545,
            priceAction: 3180,
            action: 30
          },
          '5-9': {
            priceMoonth: 760,
            price: 3790,
            priceAction: 4545,
            action: 32
          },
        },
        months: '6 months'
      },
      12: {
        range: {
          '1-2' : {
            priceMoonth: 305,
            price: 134,
            priceAction: 3635,
            action: 45
          },
          '3-4': {
            priceMoonth: 420,
            price: 9090,
            priceAction: 5000,
            action: 45
          },
          '5-9': {
            priceMoonth: 645,
            price: 13635,
            priceAction: 7575,
            action: 45
          },
        },
        months: '12 months'
      }
    }
  })
  const [checkedBtnMoonth, setCheckedBtnMoonth] = useState(3)
  const [checkValuta, setCheckValuta] = useState('USD');
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
              <input type="radio" name="moonth" id="one-moonth" onChange={(e) => setCheckedBtnMoonth(1)} checked={checkedBtnMoonth === 1 } />
              <li>
                <span>1 moonth</span>
              </li>
              </label>
              <label className="products__moonths-chang-item">
              <input type="radio" name="moonth" id="three-moonth" onChange={(e) => setCheckedBtnMoonth(3)} checked={checkedBtnMoonth === 3 }/>
              <li>
                <span>3 moonth</span>
              </li>
              </label>
              <label className="products__moonths-chang-item"> 
              <input type="radio" name="moonth" id="six-moonth" onChange={(e) => setCheckedBtnMoonth(6)} checked={checkedBtnMoonth === 6 }/>
              <li>
                <span>6 moonth</span>
              </li>
              </label>
              <label className="products__moonths-chang-item">
              <input type="radio" name="moonth" id="twelve-moonth" onChange={(e) => setCheckedBtnMoonth(12)} checked={checkedBtnMoonth === 12 }/>
              <li>
                <span>12 moonth</span>
              </li>
              </label>
            </ul>
            <Select
      defaultValue="$ USD"
      className="products__change-currency"
      onChange={(e) => setCheckValuta(e)}
      options={[
        {
          value: 'USD',
          label: '$ USD',
        },
        {
          value: 'EUR',
          label: '€ EUR',
        },
        {
          value: 'UAH',
          label: '₴ UAH',
        },
      ]}
    />
          </div>
        </div>
        <div className="products__wrap">
          <ProductCard infoState={localStateProductCard[checkValuta][checkedBtnMoonth]} checkValuta={checkValuta} />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Products;
