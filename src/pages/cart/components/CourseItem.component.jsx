import React from "react";

const CourseItem = (props) => {
  const { thumbnail, author, title, slug } = props;
  return (
    <div className="course-item" data-course="${id}">
      <a href={"/course/" + slug} className="">
        <div className="card-thumbnail">
          <img src="https://images.unsplash.com/photo-1542995470-870e12e7e14f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        </div>
        <div className="card-info">
          <div className="card-info__title">${title}</div>
          <div className="card-info__instructor">
            by&nbsp;${author?.fullname}
          </div>
          <div className="card-info__rating">
            {/* ${renderRating(rating_avg_rating, rating_count)} */}
          </div>
        </div>
      </a>
      <div className="card-action">
        {/* ${actions} */}
        <span class="remove-btn">Remove</span>
        <span class="move-to-cart">Move to cart</span>
      </div>
      <div className="card-price">
        {/* ${
                  discount === "Free"
                    ? `<span title="${coupon.code}" className='discount d-flex align-items-center'>Free<i className='fas fa-tag'></i>
                        </span>`
                    : discount
                    ? `<span title="${coupon.code}" className='discount d-flex align-items-center'>$<span>${discount}</span>
                            <i className="fas fa-tag"></i>
                        </span>`
                    : ""
                } */}

        {/* <span className="${
                  discount ? "original-price line-through" : ""
                }">$<span>${price.price}</span></span> */}
      </div>
    </div>
  );
};
export default CourseItem;
