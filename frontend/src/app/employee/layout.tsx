import { Footer, Header } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-light overflow-x-hidden overflow-y-auto max-w-[1920px]">
      <Header />
      {children}
      <ToastContainer />

      {/* <Footer /> */}
    </div>
  );
};

export default HomePageLayout;
