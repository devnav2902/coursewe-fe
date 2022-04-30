import { DataCart, ShoppingCart } from "../ts/types/cart.types";
import axiosClient from "../utils/axios";

class Cart {
  get = async () => {
    return axiosClient.get<DataCart>("/cart/me");
  };

  delete = async (courseId: number) => {
    return axiosClient.delete<ShoppingCart>(`/cart/${courseId}`);
  };

  addToCart = async (data: { course_id: number }) => {
    return axiosClient.post("/cart", data);
  };

  savedForLater = async (courseId: number) => {
    return axiosClient
      .patch("/saved-for-later", { course_id: courseId })
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const CartApi = new Cart();
export default CartApi;
