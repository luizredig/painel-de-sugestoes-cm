import type { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">
        <div className="flex h-screen flex-row">
          <Sidebar />

          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};
