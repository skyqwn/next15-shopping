import { PopularProduct } from "./populat-product";
import ScreenList from "./screen-list";

const PopularHomeScreen = () => {
  return <ScreenList products={PopularProduct} title="인기 상품" />;
};

export default PopularHomeScreen;
