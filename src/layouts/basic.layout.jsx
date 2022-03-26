import Footer from "../components/Footer/Footer.component";
import TopNav from "../components/TopNav/TopNav.component";

const BasicLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default BasicLayout;
