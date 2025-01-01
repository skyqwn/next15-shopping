import { PropsWithChildren, useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps extends PropsWithChildren {
  elementId: string;
}

const Portal = ({ elementId, children }: PortalProps) => {
  const rootElement = useMemo(
    () => document.getElementById(elementId),
    [elementId],
  );

  return createPortal(children, rootElement as HTMLElement);
};

export default Portal;
