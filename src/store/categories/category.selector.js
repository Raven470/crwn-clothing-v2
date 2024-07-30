import { createSelector } from "reselect";

// initial selector
const selectCategoryReducer = (state) => state.categories;

// memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // input selector
  (categories) => categories.categories // output selector
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);

/* 
export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
 */
