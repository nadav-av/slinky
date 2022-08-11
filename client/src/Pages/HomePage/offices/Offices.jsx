import React from "react";
import "../../OfficePage/officePage.css";
import office_1 from "../../../Components/OfficeForm/offices-images/yitzhak-sadeh-6.jpg";
import office_2 from "../../../Components/OfficeForm/offices-images/azrieli.jpg";
import office_3 from "../../../Components/OfficeForm/offices-images/gav-yam1.jpg";

const backgroundOffice = {
  backgroundColor: "#f5e3e6",
};

const Offices = () => {
  return (
    <div className="office-container" style={backgroundOffice}>
      <div className="header">
        <h2>Our Offices</h2>
      </div>
      <div className="offices">
        <div className="office_option">
          <div className="office_img">
            <img src={office_1} alt="office" />
          </div>
          <h3>Rubinshtein Twin Towers</h3>
          <span>Yitzhak-sadeh 6, Tel Aviv, Floor 35</span>
          <p>
            Modern open-space and offices. Includes eight open-space seats,
            three personal offices, two small rooms and one conference room.
          </p>
        </div>
        <div className="office_option">
          <div className="office_img">
            <img src={office_2} alt="office" />
          </div>
          <h3>Azrieli Square Tower</h3>
          <span>Menahem Begin 132, Tel Aviv, Floor 26</span>
          <p>
            Boutiqe offices in Tel-aviv, Nearby Hashalom train station. Includes
            two personal offices and one conference room.
          </p>
        </div>
        <div className="office_option soon">
          <div className="office_img">
            <img src={office_3} alt="office" />
          </div>
          <h3>
            Gav-Yam <div>Center</div>
          </h3>
          <span>Maskit 12, Herzliya</span>
          <p>Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Offices;
