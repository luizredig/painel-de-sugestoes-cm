import { Card } from "../ui/card.tsx";

type TopbarProps = {
  title: string;
};

const Topbar = ({ title }: TopbarProps) => {
  return (
    <>
      <Card className="flex min-h-12 w-full items-center rounded-none border-x-0 border-t-0 px-5">
        <p className="text-sm font-semibold text-primary">{title}</p>
      </Card>
    </>
  );
};

export default Topbar;
