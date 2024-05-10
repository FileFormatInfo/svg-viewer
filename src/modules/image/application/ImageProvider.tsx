import { type PropsWithChildren, useRef } from "react";

import { type ImageStore, initializeImageStore, Provider } from "./imageStore";

const ImageProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<ImageStore>();

  if (!storeRef.current) {
    storeRef.current = initializeImageStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export { ImageProvider };
