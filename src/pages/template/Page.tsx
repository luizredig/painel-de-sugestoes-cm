import Topbar from "@/components/topbar/Topbar";

export type PageProps = {
  title: string;
  children: React.ReactNode;
};

const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <div>
        <Topbar title={title} />

        {children}
      </div>
    </>
  );
};

export default Page;
