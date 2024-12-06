import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CommonText from "../../components/CommonText";

const Testimonial = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      image:
        "https://i.ibb.co/7tFcSVB/IMG-9819-2-2000-7135e00311464ff79b546ab1e1174b27.jpg",
      reviewText:
        "The seasonal fruit bundle was amazing! Fresh, juicy, and well-packed. The variety of fruits exceeded my expectations, and I was particularly impressed by how fresh everything was upon arrival. I’ve tried many other services before, but this one truly stands out for its quality and attention to detail. Highly recommend it to anyone looking for premium produce delivered right to their doorstep. Will definitely order again!",
      designation: "Food Blogger",
    },
    {
      name: "Michael Lee",
      image: "https://i.ibb.co/nskVT9Z/348s.jpg",
      reviewText:
        "Great discounts and exceptional service! The fruits were as fresh as advertised, and the packaging ensured they arrived in perfect condition. I especially appreciated the timely delivery and the variety offered in the seasonal bundle. As a nutritionist, I am always on the lookout for high-quality produce, and this service definitely checks all the boxes. It’s rare to find such a perfect combination of value, quality, and reliability. Kudos to the team!",
      designation: "Nutritionist",
    },
    {
      name: "Sophia Ramirez",
      image:
        "https://i.ibb.co/D45bV0s/Card-of-Mich-Facts-about-Mens-Health-featured-image-scaled.jpg",
      reviewText:
        "I loved the variety in the bundle. From apples to bananas, everything was top-notch and bursting with flavor. The care taken in packaging was evident, and the delivery was right on time, which is always a huge plus for me. The service is an absolute lifesaver for someone like me who is always on the go. Kudos to the team for providing such an amazing experience. This has become my go-to service for fresh produce!",
      designation: "Health Enthusiast",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto text-center mt-32">
      <CommonText
        small="Testimonial"
        header="What our Customers Say"
      ></CommonText>
      <p className="text-[14px]">
        Do not just take our word for it---here is some of our customers have to{" "}
        <br />
        say about their experience with Fresh Harvest
      </p>
      <div className="testimonial-container max-w-[1440px] mx-auto mt-24">
        <Swiper
          loop={true} // Enables looping
          pagination={{ clickable: true }} // Adds clickable pagination
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="pb-24 flex flex-col justify-center sm:flex-row mx-auto items-center gap-14">
                {/* Image Section */}
                <div className="relative z-10 w-[287px] h-[396px] rounded-[200px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={review.image}
                    alt=""
                  />
                </div>
                {/* Text Section */}
                <div className="bg-[#F4F6F6] max-w-[643px] p-6 rounded-lg text-center sm:text-left">
                  <p className="mb-4 text-[#4A4A52]">{review.reviewText}</p>
                  <div className="flex text-[18px] justify-center sm:justify-start items-center gap-2">
                    <p className="font-bold text-lg">{review.name}</p>
                    <span className="text-[#212337] text-sm">
                      --{review.designation}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
