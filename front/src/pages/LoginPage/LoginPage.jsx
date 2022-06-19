import React, { useState, useRef, useEffect } from "react";
import Register from "../../Components/Login/Register.jsx";
import Login from "../../Components/Login/Login.jsx";
import LogRegSlider from "../../Components/Login/LogRegSlider.jsx";
import "./LoginPage.scss";

const registerMessage = "Are you new here? Register!";
const loginMessage = "Already have an account? Login!";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const slider = useRef(null);

  useEffect(() => {
    slider.current.classList.add("right");
  }, []);

  const handleClick = () => {
    console.log(slider);
    if (!isRegister) {
      slider.current.classList.remove("right");
      slider.current.classList.add("left");
    } else {
      slider.current.classList.remove("left");
      slider.current.classList.add("right");
    }
    setIsRegister(!isRegister);
  };

  return (
    <div className="LogRegPage">
      <div className="log-reg-container">
        <div className="log-reg-content">
          {isRegister ? <Register /> : <Login />}

          <LogRegSlider
            text={isRegister ? loginMessage : registerMessage}
            handleClick={() => handleClick()}
            sliderRef={slider}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
