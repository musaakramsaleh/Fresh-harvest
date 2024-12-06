import image from "../../assets/bg-1.png";
import Aboutus from "./Aboutus/Aboutus";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import Offer from "./Offer";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Products></Products>
      <Aboutus></Aboutus>
      <Offer></Offer>
      <Testimonial></Testimonial>
      <Blogs></Blogs>
    </div>
  );
};

export default Home;
