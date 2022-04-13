import { useState } from "react";
import styled from "styled-components";

const StyledBtnItem = styled.div`
  padding-bottom: 1px;
  line-height: 1;
  border-bottom: #000 1px solid;
  transition: all 0.2s;
  &:hover {
    border-color: transparent;
  }
`;

const StyledCouponWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  input {
    height: inherit;
    outline: none;
    flex-grow: 1;
    border: 1px solid #000;
    padding: 0 1rem;
  }

  button {
    background-color: rgba(0, 0, 0, 0.836);
    color: #fff;
    padding: 0 1rem;
    flex-shrink: 0;
    border: none;
    height: inherit;
    &:hover {
      background-color: #000;
    }
  }

  .coupon-code {
    align-items: center;
    padding: 1rem 2rem;
  }
  button#remove {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    font-size: 17px;
    margin-right: 1em;
  }
  .warning {
    font-size: 14px;
    padding: 1rem 2rem;
    color: rgb(253, 80, 80);
  }
`;

const CouponAndGift = () => {
  const [displayCouponInput, setDisplayCouponInput] = useState(false);
  return (
    <div className="pd-l-2 pd-r-2 pd-b-2">
      <div className="justify-content-center d-flex mb-1">
        <StyledBtnItem>
          <div
            onClick={() => setDisplayCouponInput(true)}
            className="coupon fw-bold cursor-pointer"
          >
            Mã giảm giá
          </div>
        </StyledBtnItem>
      </div>
      {displayCouponInput && (
        <StyledCouponWrapper>
          <input
            name="coupon-input"
            placeholder="Nhập mã giảm giá"
            type="text"
          />
          <button id="apply">Áp dụng</button>
        </StyledCouponWrapper>
      )}
    </div>
  );
};

// @if (empty($globalUser))
//                 <div className="coupon-wrapper">
//                   <input name="coupon-input" placeholder="Enter Coupon" type="text">
//                   <button id="apply" type="submit">Apply</button>
//                 </div>
//               @else
//                 @if (!$isPurchased && $globalUser->id !== $course->author_id)
//                   <div className="coupon-wrapper">
//                     <input name="coupon-input" placeholder="Enter Coupon" type="text">
//                     <button id="apply" type="submit">Apply</button>
//                   </div>
//                 @endif
//               @endif

//               @if (Request::method() == 'POST')
//                 @if (empty($coupon))
//                   <p className="warning">Mã code vừa nhập không chính xác, vui lòng thử lại.
//                   </p>
//                 @else
//                   <div className="coupon-code d-flex">
//                     <button id="remove" type="button" onclick="location.href = location.href">
//                       <i className="fas fa-times"></i>
//                     </button>
//                     <p><b>{{ $coupon->code }}</b> đã được áp dụng</p>
//                   </div>
//                 @endif
//               @endif

export default CouponAndGift;
