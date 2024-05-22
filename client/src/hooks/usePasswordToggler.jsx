import { useState, useRef, useEffect } from "react";

function usePasswordToggler() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef(null);
  useEffect(() => {
    passwordRef.current.type = "password";
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(() => !isPasswordVisible);
    passwordRef.current.type = isPasswordVisible ? "password" : "text";
  };

  return { isPasswordVisible, togglePasswordVisibility, passwordRef };
}

export default usePasswordToggler;
