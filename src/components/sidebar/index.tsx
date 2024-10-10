import { Card, CardContent, CardHeader } from "../ui/card";

const Sidebar = () => {
  return (
    <>
      <Card className="h-100 flex w-96 flex-col border-none p-0">
        <CardHeader className="flex h-14 flex-row items-center justify-between bg-primary p-0">
          <img src="/logo.svg" alt="Logo" className="ml-5 h-10 w-10" />
        </CardHeader>

        <CardContent className="flex flex-1 bg-secondary"></CardContent>
      </Card>
    </>
  );
};

export default Sidebar;
