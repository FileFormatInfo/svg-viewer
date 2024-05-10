import { ReactNode } from "react";



import { Navigate } from "shared/Router";



import { useImageStore } from "./imageStore";


export interface IRequireImageProps {
  children: ReactNode;
  to?: string;
}

const RequireImage = ({ children, to }: IRequireImageProps) => {
  const hasImage = useImageStore((store) => store.url != null);

  return hasImage ? <>{children}</> : <Navigate to={to ?? "/"} />;
};

export { RequireImage };