import styled from "styled-components";

export const StyledWrapper = styled.form`
  padding: 6.4rem 2.4rem;

  h1 {
    font-size: 3.2rem;
    text-align: center;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  p {
    text-align: center;
    margin-top: 2.4rem;
  }

  .create-course__input {
    text-align: center;
    max-width: 60rem;
    margin: auto;
    input {
      margin-top: 6.4rem;
      width: 100%;
      height: 4.8rem;
      border: 1px solid #1c1d1f;
      padding: 0 1.6rem;
      outline: none;
    }
  }

  .create-course__footer {
    padding-top: 6.4rem;
    display: flex;
    justify-content: space-between;

    .btn-default {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
    }
  }
`;
