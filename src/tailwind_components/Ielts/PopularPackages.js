import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  HelpCircle,
  Zap,
  Tag,
  LibraryBig,
  Star,
  Check,
  ShoppingBag,
} from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";

const PopularPackages = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async (packageId) => {
      try {
        const response = await ajaxCall(
          `/package/noauth/${packageId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    };

    (async () => {
      setIsLoading(true);
      try {
        const [packages30, packages31] = await Promise.all([
          fetchPackages(30),
          fetchPackages(31),
        ]);
        setPackages([packages30, packages31]);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full lg:w-1/1 xl:w-2/4 mt-8 lg:mt-0 lg:pl-8 flex justify-center items-center">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          <div className="h-8 bg-white/20 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="h-64 bg-white/10 rounded-2xl"></div>
            <div className="h-64 bg-white/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (packages.length === 0) return null;

  return (
    <div className="w-full lg:w-1/1 xl:w-2/4 mt-8 lg:mt-0 lg:pl-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Zap className="w-6 h-6 mr-2 text-yellow-400" />
        Popular Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages?.map((pkg, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative group"
          >
            {pkg?.coupon_code && (
              <div className="absolute -right-12 top-7 w-40 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-bold py-1.5 px-12 rotate-45 text-center z-10 shadow-md">
                <span className="truncate flex items-center justify-center">
                  <Tag className="w-3 h-3 mr-1" />
                  Save ₹{pkg?.coupon_code?.discount}
                </span>
              </div>
            )}

            <div className="p-5 pt-6">
              <div className="flex items-start mb-4">
                <div className="bg-primary-100 p-2 rounded-lg mr-3">
                  <ShoppingBag className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {pkg?.PackageType?.name}
                    </span>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 line-clamp-2 mt-2">
                    {pkg?.package_name}
                  </h3>
                </div>
              </div>

              <div className="mb-5 bg-gradient-to-r from-primary-50 to-white p-3 rounded-lg">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{pkg?.package_price - pkg?.coupon_code?.discount}
                  </span>
                  {pkg?.coupon_code && (
                    <span className="ml-2 text-sm text-gray-500 line-through mb-1">
                      ₹{pkg?.package_price}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-1 font-medium">
                  Duration for {pkg?.duration} months
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="font-medium">
                    {pkg?.full_length_test_count} Full Tests
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="font-medium">
                    {pkg?.practice_test_count} Practice Tests
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <HelpCircle className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="font-medium">
                    {pkg?.group_doubt_solving_count} Doubt Sessions
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <LibraryBig className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="font-medium">E-Library</span>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-4 rounded-xl transition duration-300 font-medium text-sm flex items-center justify-center group-hover:shadow-lg"
                onClick={() => navigate(`/course/${pkg?.select_course?.id}`)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Enroll Now
              </button>

              {pkg?.coupon_code && (
                <div className="mt-3 text-xs text-center bg-primary-50 py-2 px-3 rounded-lg">
                  Use code:{" "}
                  <span className="font-bold text-primary-600">
                    {pkg?.coupon_code?.cupon_code}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="flex items-center text-white text-sm">
          <Check className="w-4 h-4 mr-2 text-accent-400" />
          <span>Join 15,000+ students who achieved their target scores</span>
        </div>
      </div>
    </div>
  );
};

export default PopularPackages;
