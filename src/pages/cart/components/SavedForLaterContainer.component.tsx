import { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import CourseItem from "./CourseItem.component";

const SavedForLaterContainer: FC = () => {
  const { saved_for_later } = useTypedSelector((state) => state.cart);

  return (
    <div className="shopping-list s4L">
      <div className="shopping-list__title">Danh sách thanh toán sau</div>
      <div className="shopping-list__course" id="saved_for_later">
        {saved_for_later.courses.map((courseItem) => (
          <CourseItem
            key={courseItem.id}
            course={courseItem}
            actionType="saved_for_later"
          />
        ))}
      </div>
    </div>
  );
};

export default SavedForLaterContainer;
