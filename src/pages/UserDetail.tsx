import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, IUser } from "../types/user";
import { useParams } from "react-router-dom";
import { API } from "../API";

import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
} from "@pbe/react-yandex-maps";

export default function UserDetail() {
  const { userId } = useParams();

  const { data: user } = useQuery({
    queryFn: async () => {
      const res = await API.get<ApiResponse<IUser>>(`/users/${userId}`);
      return res?.data;
    },
    queryKey: ["user", userId],
  });

  return (
    <section className="">
      <div className="">
        <div className="">
          <h2 className="text-black text-[32px] font-bold mb-6">User Detail</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="">
              <div className="bg-white p-6.25 rounded-lg mb-6">
                <h3 className=" text-[22px] font-semibold mb-5">
                  Info about user
                </h3>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Name:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[200px] font-semibold">
                    {user?.name}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Phone:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[200px] font-semibold">
                    {user?.phone}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Email:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[200px] font-semibold">
                    {user?.email}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6.25 rounded-lg">
                <h3 className=" text-[22px] font-semibold mb-5">
                  Info about Company
                </h3>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Company name:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[200px] font-semibold">
                    {user?.company?.name}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Company phrase:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[350px] font-semibold">
                    {user?.company?.catchPhrase}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    Company business:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[400px] font-semibold">
                    {user?.company?.bs}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6.25 rounded-lg">
              <h3 className=" text-[22px] font-semibold mb-5">Address</h3>

              <div className="">
                <div className="bg-gray-100 rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2">
                  <span className="text-gray-700 text-[14px] font-medium min-w-[50px]">
                    address:
                  </span>
                  <span className="text-gray-700 text-[14px] max-w-[400px] font-semibold">
                    {user?.address?.city}, {user?.address?.street} -{" "}
                    {user?.address?.zipcode}
                  </span>
                </div>
              </div>

              <div className="w-full h-full mt-5 max-h-100">
                <YMaps
                  query={{
                    apikey: "bc32072f-a50d-4f7e-b22c-a4b70bba1202",
                  }}
                >
                  <Map
                    className="w-full h-full"
                    state={{
                      center: [
                        user?.address?.geo?.lat || "0",
                        user?.address?.geo?.lng || "0",
                      ],
                      zoom: 2,
                    }}
                  >
                    <Placemark
                      geometry={[
                        user?.address?.geo?.lat || "0",
                        user?.address?.geo?.lng || "0",
                      ]}
                    />
                    <FullscreenControl />
                    <ZoomControl options={{ float: "right" }} />
                  </Map>
                </YMaps>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
