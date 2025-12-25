import { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftComponent from "./LeftComponent";

export default function Layout() {
  return (
    <>
      <div className="">
        <LeftComponent />

        <Header />
      </div>

      <main className="p-[30px_30px_0_30px] ml-60 max-[1150px]:ml-0 mt-20 max-[1150px]:mt-25">
        <Outlet />
      </main>
    </>
  );
}
