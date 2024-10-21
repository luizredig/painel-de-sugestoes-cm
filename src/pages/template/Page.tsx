import Topbar from "@/components/topbar/Topbar";

export type PageProps = {
  title: string;
  children: React.ReactNode;
};

const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <div className="flex w-full flex-col overflow-x-hidden overflow-y-hidden">
        <Topbar title={title} />

        <div className="flex overflow-scroll [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default Page;
