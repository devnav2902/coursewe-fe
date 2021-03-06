import styled from "styled-components";

export const StyledBanner = styled.div`
  padding: 10rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://generalassemb.ly/sites/default/files/styles/program_header_desktop_xxl_1x/public/2019-11/1_UXD_HeaderImage_112519.jpg?itok=uFgDWIUe")
    center/cover;
  position: relative;
  font-family: var(--font-titillium);

  .transparent-bgr {
    background-color: transparent;
  }
  .banner-wrap {
    max-width: 1200px;
    padding: 0px 2rem;
    position: relative;
    z-index: 2;
    width: 100%;

    .title {
      font-size: 40px;
      font-weight: 900;
      color: var(--color-dark);
    }
  }
`;

export const StyledProfile = styled.div`
  .profile-page {
    &__main {
      max-width: 1200px;
      margin: auto;
      width: 100%;
      padding: 2rem;
      min-height: 90vh;

      label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
      }
      .group {
        margin-bottom: 2rem;
      }
    }
  }
`;
