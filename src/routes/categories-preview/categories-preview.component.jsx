import { useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {categoriesMap &&
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
    </>
  );
}

export default CategoriesPreview;
