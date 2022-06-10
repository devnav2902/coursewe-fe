import { FC } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  background: #1c1d1f;
  padding: 5rem 0;
  color: #fff;
  border-top: 1px solid #dcdacb;
  .footer-content {
    padding: 0 3rem;
    display: flex;
    flex-wrap: wrap;
    .col:nth-child(1) {
      flex: 0 1 40%;
      margin-right: var(--spacing-2);
    }
    .col:nth-child(2) {
      margin-right: var(--spacing-2);
      margin-left: auto;
    }
    .col:nth-child(3) {
      margin-left: auto;
    }
  }
  .col {
    h4 {
      color: #fff;
    }
    h4,
    p {
      margin-bottom: var(--spacing-1);
    }
    a {
      color: var(--color-blue);
    }
  }

  @media only screen and (max-width: 768px) {
    .footer {
      .footer-content {
        flex-direction: column;
      }
      .col {
        flex: 1 1 100% !important;
        margin: 0 0 var(--spacing-2) !important;
      }
    }
  }
`;

const Footer: FC = () => {
  return (
    <StyledFooter>
      <div className="footer-content">
        <div className="col">
          <h4>Coursewe</h4>
          <p>
            <a href="#">Coursewe Business</a>
          </p>
          <p>
            <a href="#">Giảng dạy tại Coursewe</a>
          </p>
          <p>
            <a href="#">Tutorials</a>
          </p>
          <p>
            <a href="#">Blog</a>
          </p>
          <p>
            <a href="#">Contact us</a>
          </p>
        </div>
        <div className="col">
          <p>
            <a href="#">Careers</a>
          </p>
          <p>
            <a href="#">Help and support</a>
          </p>
          <p>
            <a href="#">Affiliate</a>
          </p>
          <p>
            <a href="#">Investors</a>
          </p>
        </div>
        <div className="col">
          <p>
            <a href="#">Terms</a>
          </p>
          <p>
            <a href="#">Privacy policy</a>
          </p>
          <p>
            <a href="#">Sitemap</a>
          </p>
          <p>
            <a href="#">Accessibility statement</a>
          </p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
