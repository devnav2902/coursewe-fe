import { useEffect, useState } from "react";
import PurchaseApi from "../../../api/purchase.api";

const PurchaseHistoryPage = () => {
  const [courseBill, setCourseBill] = useState([]);

  useEffect(() => {
    PurchaseApi.purchaseHistory().then((res) => {
      const { data, status } = res;
      if (status === 200) setCourseBill(data.courseBill);
    });
  }, []);

  return (
    <div className="purchase-history-container">
      <div className="title">Lịch sử thanh toán</div>
      <div className="bars">
        <div className="bar__item">Courses</div>
      </div>

      <div className="purchase-content">
        {!courseBill ? (
          <div className="empty">
            <i className="fas fa-shopping-cart"></i>
            <p>Bạn chưa có bất kỳ thanh toán nào.</p>
          </div>
        ) : (
          <div className="list-item">
            <table>
              <thead>
                <tr>
                  <th>Khóa học</th>
                  <th>Ngày thanh toán</th>
                  <th>Mã giảm giá</th>
                  <th>Giá</th>
                  <th>Thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {courseBill.map((course) => {
                  const { title, created_at, promo_code, price, purchase } =
                    course;

                  return (
                    <tr>
                      <td>{title}</td>
                      <td>{created_at}</td>
                      <td>{promo_code ? promo_code : "Không có"}</td>
                      <td>${price}</td>
                      <td>${purchase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
