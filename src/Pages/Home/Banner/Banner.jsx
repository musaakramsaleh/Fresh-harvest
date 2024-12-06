const Banner = () => {
  return (
    <>
      <div>
        <div
          className="object-contain py-8"
          style={{
            backgroundImage: "url('/mainbanner.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex justify-center">
              {/* banner content */}
              <div className="w-full md:w-[55%] ">
                <button className="text-[#749B3F] bg-[#749B3F] bg-opacity-10 font-medium py-1 px-2 rounded">
                  {" "}
                  Welcome to Fresh Harvest
                </button>
                <h1 className="font-Rubik font-medium text-[#212337] text-[80px] leading-none my-8">
                  Fresh Fruits and Vegetables
                </h1>
                <p className="max-w-lg text-base font-Questrial text-[#4A4A52]">
                  At Fresh Harvests, we are passionate about providing you with
                  the freshest and most flavorful fruits and vegetables
                </p>
                <button className="bg-[#FF6A1A] text-white mt-5 font-bold py-2 px-7 rounded">
                  Shop Now
                </button>

                <div className="bg-gray-200 py-4 rounded-md flex justify-between items-center px-4 ml-60 mr-8 mt-8">
                  <div className="pl-2 space-y-2">
                    <p className="text-primary">Special Offer</p>
                    <h4 className="text-xl font-Rubik font-semibold">
                      Fresh Salad
                    </h4>
                    <h5 className="font-Rubik font-semibold">
                      {" "}
                      <span className="text-primary">Up to</span>{" "}
                      <span className="border border-red-400 rounded-full">
                        70%
                      </span>{" "}
                      off
                    </h5>
                    <button className="bg-primary text-white font-bold uppercase rounded-full py-2 px-4">
                      code: <span className="text-red-400">fresh25</span>
                    </button>
                  </div>
                  <div>
                    <img
                      className=" object-cover "
                      src="/photono2.png"
                      alt="banner photo"
                    />
                  </div>
                </div>
                <p>Download App:</p>
                <div className="flex gap-4 mt-2">
                  <img src="/photono03.png" alt="banner appStore" />
                  <img src="/photono04.png" alt="banner googlePry" />
                </div>
              </div>

              {/* banner photo */}
              <div className="w-full md:w-[45%] ">
                <img className="" src="/photono01.png" alt="banner photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
