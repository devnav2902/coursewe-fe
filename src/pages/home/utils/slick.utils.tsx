import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { StyledCarouselBtn } from "../styles/Button.styles";

function SampleNextArrow(props: any) {
  const { onClick, className } = props;
  const disabledBtn =
    className.indexOf("slick-disabled") > -1 ? " slick-disabled" : "";

  return (
    <StyledCarouselBtn
      onClick={onClick}
      className={"carousel-next-btn" + disabledBtn}
    >
      <MdArrowForwardIos />
    </StyledCarouselBtn>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick, className } = props;
  const disabledBtn =
    className.indexOf("slick-disabled") > -1 ? " slick-disabled" : "";

  return (
    <StyledCarouselBtn
      onClick={onClick}
      className={"carousel-prev-btn" + disabledBtn}
    >
      <MdArrowBackIosNew />
    </StyledCarouselBtn>
  );
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export { settings };
