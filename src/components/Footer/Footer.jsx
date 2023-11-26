import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-black border border-t-2 ">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 h-full inline-flex items-center">
                <Logo
                  width="100px"
                  className={"flex justify-center items-center"}
                />
              </div>
              
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 flex">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-100">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-100">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-100">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base text-[#00cee6] hover:text-gray-100"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
            
          </div>
          <div className="w-full flex justify-center items-center">
                <p className="text-sm text-[#3f7cb3]">
                  &copy; Copyright 2023
                  <Link
                    className="px-1 text-white"
                    to={"https://twitter.com/starabdul100"}
                  >
                    Abdul Shaik
                  </Link>
                  . All rights reserved.
                </p>
              </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
