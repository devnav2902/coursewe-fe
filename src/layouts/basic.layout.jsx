import Footer from "../components/Footer/Footer.component";
import TopNav from "../components/TopNav/TopNav.component";

const BasicLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <main className="spacing-top-nav">{children}</main>
      <Footer />
    </>
  );
};
export default BasicLayout;
