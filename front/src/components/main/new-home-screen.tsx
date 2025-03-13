import { NewProduct } from "./new-product";
import ScreenList from "./screen-list";

const NewHomeScreen = () => {
  return <ScreenList title="신상 제품" products={NewProduct} />;
};

export default NewHomeScreen;
