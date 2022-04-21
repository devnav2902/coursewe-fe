import axiosClient from "../utils/axios";

class Cart {
  get = async () => {
    return axiosClient
      .get("/cart/me")
      .then((res) => res)
      .catch((error) => error.response);
  };

  delete = async (courseId: number) => {
    return axiosClient
      .delete(`/cart/${courseId}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  addToCart = async (data: object) => {
    return axiosClient
      .post("/cart", data)
      .then((res) => res)
      .catch((error) => error.response);
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
