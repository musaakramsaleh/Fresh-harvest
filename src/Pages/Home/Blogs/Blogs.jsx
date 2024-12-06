import { FaArrowRight } from "react-icons/fa6";
import CommonText from "../../../components/CommonText";

const Blogs = () => {
  const blogs = [
    {
      image: "https://i.ibb.co.com/pPJ4B48/image-2.png",
      date: "May 23, 2024",
      description:
        "Exploring Seasonal Delights:A Guide to What's Fresh Right No",
    },
    {
      image: "https://i.ibb.co.com/3m57QRK/image-3.png",
      date: "May 23, 2024",
      description:
        "Mastering Salad Creations:Tips and Tricks for Bullding Delicious and Nutritious Salads",
    },
    {
      image: "https://i.ibb.co.com/mDTXRbY/image-4.png",
      date: "May 23, 2024",
      description:
        " The Art of Meal Prepping:How to Save Time and Eat Healthy Throughou the Week",
    },
  ];
  return (
    <>
      <div className="max-w-[1440px] my-20 mx-auto px-6 bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="text-center">
            {/* section heading component */}
            <CommonText
              small="Our Blogs"
              header="Fresh Harvest Blog"
            ></CommonText>
            <p className="text-[#4A4A52] text-[14px]">
              Welcome to the Fresh Harvest Blog, your go-to resource for all
              things
              <br />
              related to fresh produce, healthy eating, and culinary
              inspiration.
            </p>
          </div>
        </div>

        <div className="">
          <div className="grid mt-10 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog, idx) => {
              return (
                <div>
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={blog.image}
                    alt="blog image"
                  />
                  <div className="mt-4">
                    <span className="text-[#4A4A52] font-Questrial">
                      {blog.date}
                    </span>
                    <h1 className="mt-2 text-[18px] font-medium text-gray-800 font-Rubik ">
                      {blog.description}
                    </h1>
                    <button className="flex items-center gap-2 text-[#FF6A1A] font-semibold mt-2">
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
