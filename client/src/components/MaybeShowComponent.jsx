import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowComponent = ({ children }) => {
  const [showComponent, setShowComponent] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const hidePaths = ["/", "/verify-email"];
    const shouldHide = hidePaths.some(
      (path) =>
        location.pathname === path ||
        location.pathname.startsWith("/verify-email/")
    );
    setShowComponent(!shouldHide);
  }, [location]);

  return showComponent ? <div>{children}</div> : null;
};

export default MaybeShowComponent;
