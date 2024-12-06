import React, { useState, useEffect } from "react";
import CommonText from "../../components/shared/CommonText";

const Offer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date().setHours(96, 0, 0, 0);
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      className="h-[640px] mt-24 md:bg-cover md:bg-center max-w-[1440px] mx-auto"
      style={{ backgroundImage: "url('/Footer Section (1).png')" }}
    >
      <div className="pt-[120px] px-6 sm:px-10 md:px-[120px]">
        <p className="bg-[#A6A6A6] bg-opacity-10 font-bold inline px-2 py-1 mx-auto text-[#749B3F]">
          Special Offer
        </p>
        <h2 className="font-medium text-[#212337] text-2xl sm:text-4xl md:text-[80px]">
          Seasonal Fruit Bundle
        </h2>
        <h2 className="font-medium text-3xl mt-10 sm:text-4xl md:text-[48px]">
          Discount up to <span className="text-[#FF6A1A]">80% OFF</span>
        </h2>
        <div className="flex flex-wrap gap-5 mt-5 justify-center md:justify-start">
          <div className="w-[80px] sm:w-[98px] h-[100px] sm:h-[122px] bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-md">
            <span className="text-[30px] sm:text-[40px] font-bold">
              {timeLeft.days || "0"}
            </span>
            <span className="text-[12px] sm:text-[18px]">Days</span>
          </div>
          <div className="w-[80px] sm:w-[98px] h-[100px] sm:h-[122px] bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-md">
            <span className="text-[30px] sm:text-[40px] font-bold">
              {timeLeft.hours || "0"}
            </span>
            <span className="text-[12px] sm:text-[18px]">Hours</span>
          </div>
          <div className="w-[80px] sm:w-[98px] h-[100px] sm:h-[122px] bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-md">
            <span className="text-[30px] sm:text-[40px] font-bold">
              {timeLeft.minutes || "0"}
            </span>
            <span className="text-[12px] sm:text-[18px]">Minutes</span>
          </div>
          <div className="w-[80px] sm:w-[98px] h-[100px] sm:h-[122px] bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-md">
            <span className="text-[30px] sm:text-[40px] font-bold">
              {timeLeft.seconds || "0"}
            </span>
            <span className="text-[12px] sm:text-[18px]">Seconds</span>
          </div>
        </div>
        <div className="bg-[#176D38] w-[250px] sm:w-[301px] mt-10 rounded-[92px] text-center mx-auto md:mx-0">
          <p className="text-[24px] sm:text-[32px] py-3">
            CODE : <span className="text-[#FAC714]">FRUIT28</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
