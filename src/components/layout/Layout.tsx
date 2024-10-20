import type { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar.tsx";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout w-screen">
      <div className="content w-full">
        <div className="flex h-screen w-full flex-row overflow-x-hidden">
          <Sidebar />

          <div className="flex flex-1 flex-col overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
