import type { PropsWithChildren } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">
        <div className="flex h-screen flex-row">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Topbar />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
