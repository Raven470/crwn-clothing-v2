import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

// initial selector
const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

// memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // input selector
  (categories) => categories.categories // output selector
);

// export const selectCategoriesMap = createSelector(
//   [selectCategories],
//   (categories): CategoryMap =>
//     categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       return acc;
//     }, {} as CategoryMap)
// );

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories!.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
