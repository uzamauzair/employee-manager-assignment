import { Footer, Header } from "@/components";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-light overflow-x-hidden overflow-y-auto max-w-[1920px]">
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePageLayout;
