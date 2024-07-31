import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
///// use Redux-Thunk /////
// import { fetchCategoriesAsync } from "../../store/categories/category.action";

///// use Redux-Saga /////
import { fetchCategoriesStart } from "../../store/categories/category.action";

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchCategoriesAsync());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
