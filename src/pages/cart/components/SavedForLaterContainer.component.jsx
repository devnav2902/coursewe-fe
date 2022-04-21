import CourseItem from "./CourseItem.component";

const SavedForLaterContainer = ({ shoppingCart }) => {
  return (
    <div className="shopping-list s4L">
      <div className="shopping-list__title">Danh sách thanh toán sau</div>
      <div className="shopping-list__course" id="saved_for_later">
        {shoppingCart.saved_for_later.map((courseItem) => (
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
