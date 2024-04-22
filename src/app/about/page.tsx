import React from "react";

export default function About() {
  return (
    <>
      <section className="">
        <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold text-center sm:text-5xl">
              Know About Us
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-2xl text-center ">
              Your roadmap to the ultimate custom PC experience.
            </p>
          </div>
          <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mt-4 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-rocket"
                      >
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leadi ">
                      Elevate your computing with our expert guidance.
                    </h4>
                    <p className="mt-2 text-lg ">
                      <span className="font-bold">PC_Build</span> website is
                      your ultimate destination for all things related to
                      constructing your dream PC. Whether you're a seasoned tech
                      enthusiast or a novice looking to delve into the world of
                      custom-built computers, this page has everything you need
                      to get started. From comprehensive guides on selecting the
                      right components to step-by-step tutorials for assembling
                      your rig, we've got you covered. Explore our curated
                      selection of hardware recommendations, expert tips, and
                      troubleshooting advice to ensure your PC build experience
                      is smooth and successful. Join our vibrant community of
                      builders to share insights, seek assistance, and celebrate
                      your completed builds. Start your journey towards the
                      perfect PC today with PC_Build.
                    </p>
                    <button className="mt-4 text-white bg-[#fdd000] border-0 py-2 px-6 focus:outline-none hover:bg-opacity-75 rounded text-xl">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 lg:mt-0">
              <img
                width="600"
                height="600"
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                className="mx-auto rounded-lg shadow-lg dark-bg-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      <br />
      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
          Services
        </h2>
        <p className="mb-12 text-lg text-gray-500">
          Here is a few of the awesome Services we provide.
        </p>
        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#091235] rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Understanding Your Needs
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-black uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Before diving into the intricacies of PC building, it's
                    essential to define your requirements. Are you a gamer
                    seeking high frame rates and ultra-settings? Or perhaps a
                    content creator needing powerful rendering capabilities? By
                    understanding your needs, you can select components that
                    align with your intended usage and budget.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 md:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#091235] rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Budgeting and Cost Optimization
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-black uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Building a PC can be a significant investment, but it
                    doesn't have to break the bank. PC build websites often
                    include budgeting tools and build configurators that allow
                    you to estimate costs based on your chosen components.
                    Moreover, they provide insights into cost-effective
                    alternatives and bundle deals, helping you optimize your
                    build without compromising on performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-5 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#091235] rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Compatibility Assurance
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-black uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    One of the most daunting aspects of PC building is ensuring
                    compatibility between components. Fortunately, PC build
                    websites streamline this process by flagging issues and
                    offering compatibility checks.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#091235] rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Community Support and Feedback
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-black uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Building a PC is not just a solitary endeavor; it's a
                    community-driven experience. PC build websites foster
                    communities of enthusiasts and experts who are eager to
                    share their knowledge and offer assistance.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 md:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#091235] rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Future Upgradability and Expansion
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-black uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    A well-built PC is future-proofed for potential upgrades and
                    expansions. PC build websites help you plan for the future
                    by recommending components that offer scalability and
                    compatibility with upcoming technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
