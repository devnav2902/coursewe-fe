import { useEffect, useState } from "react";
import PurchaseApi from "../../../api/purchase.api";
import Loading from "../../../components/Loading/Loading.component";
import { CourseBills } from "../../../ts/types/course-bill.types";
import { StyledPurchaseHistoryContainer } from "../styles/purchase-history.styles";

const PurchaseHistoryPage = () => {
  const [courseBillsData, setCourseBillsData] = useState<{
    loaded: boolean;
    courseBills: CourseBills;
  }>({ loaded: false, courseBills: [] });

  useEffect(() => {
    PurchaseApi.purchaseHistory().then((res) => {
      const { data, status } = res;
      console.log(data);
      if (status === 200)
        setCourseBillsData((state) => ({
          ...state,
          loaded: true,
          courseBills: data.courseBills,
        }));
    });
  }, []);

  return (
    <StyledPurchaseHistoryContainer>
      <div className="title">Lịch sử thanh toán</div>
      <div className="bars">
        <div className="bar__item">Courses</div>
      </div>

      {!courseBillsData.loaded ? (
        <Loading />
      ) : (
        <div className="purchase-content">
          {!courseBillsData.courseBills.length ? (
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
                  {courseBillsData.courseBills.map((course, i) => {
                    const { title, created_at, promo_code, price, purchase } =
                      course;

                    return (
                      <tr key={i}>
                        <td>{title}</td>
                        <td>{created_at}</td>
                        <td>{promo_code ? promo_code : "Không có"}</td>
                        <td>{parseInt(price).toLocaleString("vi-VN")}đ</td>
                        <td>{parseInt(purchase).toLocaleString()}đ</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </StyledPurchaseHistoryContainer>
  );
};

export default PurchaseHistoryPage;
