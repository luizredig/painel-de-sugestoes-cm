import Topbar from "@/components/topbar/Topbar";

export type PageProps = {
  title: string;
  children: React.ReactNode;
};

const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <div className="flex flex-1 flex-col overflow-y-hidden">
        <Topbar title={title} />

        <div className="flex overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};

export default Page;
