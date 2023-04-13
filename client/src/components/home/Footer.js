import * as React from "react";
import nvctii from "../../assets/nvcti2.png";
import FooterComponent from "../../StyledComponents/home/Footer";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BsInstagram, BsLinkedin, BsFacebook } from "react-icons/bs";

const socialNetworks = [
  {
    socialHandle: "facebook",
    link: "https://www.facebook.com/nvcti/",
    icon: <BsFacebook />,
    iconColor: "#3b5998",
  },
  {
    socialHandle: "linkeldn",
    link: "https://www.linkedin.com/company/nvcti-iitism/",
    icon: <BsLinkedin />,
    iconColor: "#0e76a8",
  },
  {
    socialHandle: "instagram",
    link: "https://www.instagram.com/nvcti.iitism/",
    icon: <BsInstagram />,
    iconColor: "#cc2467",
  },
  {
    socialHandle: "twitter",
    link: "https://twitter.com/nvcti1",
    icon: <AiOutlineTwitter />,
    iconColor: "#1da1f2",
  },
  {
    socialHandle: "youtube",
    link: "https://www.youtube.com/channel/UC4Uw9mJgYrssRq6vC7fO3fA",
    icon: <AiFillYoutube />,
    iconColor: "#ff0000",
  },
];

export default function Footer() {
  const Copyright = (props) => {
    return (
      <span {...props}>
        {"Copyright © "}- IIT (ISM) Dhanbad {new Date().getFullYear()} -
      </span>
    );
  };

  return (
    <FooterComponent>
      <div className="left">
        <img src={nvctii} alt="nvcti-logo" />
      </div>
      <div className="middle">
        <Copyright />
      </div>
      <div className="rigth">
        <div className="box">
          Follow us at: 
          {socialNetworks.map(({ socialHandle, link, icon, iconColor }) => (
            <a
              key={socialHandle}
              href={link}
              target="_blank"
              style={{ "--iconColor": iconColor }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </FooterComponent>
  );
}
