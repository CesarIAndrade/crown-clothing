import { Fragment, useContext } from "react";
import { CategoryContext } from "../../contexts/category-context.component";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  let { categories } = useContext(CategoryContext);

  return (
    <Fragment>
      {Object.keys(categories).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className='products-container'>
            {categories[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};



export default Shop;
