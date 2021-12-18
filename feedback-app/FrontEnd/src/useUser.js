import { useState } from "react";

const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  return { isLoggedIn, setIsLoggedIn };
};

export default useUser;
