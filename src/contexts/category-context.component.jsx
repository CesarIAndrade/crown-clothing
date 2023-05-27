import { createContext, useState, useEffect } from "react";

import {
  addDocsToCollection,
  getCategoriesMap,
} from "../utils/firebase/firebase.component";
import { SHOP_DATA } from "../shop-data.js";

export const CategoryContext = createContext({
  categories: [],
});

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const _addDocsToCollection = async () => {
      await addDocsToCollection("categories", SHOP_DATA);
    };

    // _addDocsToCollection();

    const _getCategoriesMap = async () => {
      let categories = await getCategoriesMap();
      setCategories(categories);
    };

    _getCategoriesMap();
  }, []);

  let value = { categories };
  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
};
