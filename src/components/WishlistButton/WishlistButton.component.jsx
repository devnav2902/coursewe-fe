import { HeartFilled, HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../utils/constants";

const StyledButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.8rem;
  border-radius: 50%;
  border: 1px solid #000;
  flex-shrink: 0;

  &:hover {
    background-color: #e9e7e7;
  }
`;

const WishlistButton = ({ course }) => {
  const { author } = course;
  const { profile } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [dataWishlist, setDataWishlist] = useState({
    movedToWishlist: false,
    loading: false,
  });

  const isInstructor = author.id === profile?.id;

  if (isInstructor) return null;

  function handleMoveToWishlist() {
    if (!profile) {
      navigate(ROUTES.SIGN_IN);
    }
    if (!dataWishlist.loading) {
      setDataWishlist((state) => ({
        ...state,
        loading: true,
        movedToWishlist: !state.movedToWishlist,
      }));
    }
  }

  const displayHeartIcon = dataWishlist.movedToWishlist ? (
    <HeartFilled style={{ fontSize: "20px" }} />
  ) : (
    <HeartOutlined style={{ fontSize: "20px" }} />
  );

  return (
    <StyledButton className="btn" onClick={handleMoveToWishlist}>
      {dataWishlist.loading ? <LoadingOutlined /> : displayHeartIcon}
    </StyledButton>
  );
};

export default WishlistButton;
