import type { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">
        <div>{children}</div>
      </div>
    </div>
  );
};
