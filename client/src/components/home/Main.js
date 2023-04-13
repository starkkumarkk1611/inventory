import React, { useState } from "react";
import MainComponent from "../../StyledComponents/home/Main";
import { HeaderOne, HeaderTwo } from "../../StyledComponents/utility";
import dropdown from "../layout/svgs/dropdown.svg";
import { Link } from "react-router-dom";
import {
  FeatureClickParagraph,
  FeatureOpenedContent,
} from "../../StyledComponents/utility";
import nvcti_logo from "../.././assets/nvcti2.png";

const labInfo = [
  {
    lab: "Robotic Technology",
    desc: "This unit is designed to develop intelligent robots and to train them. Major equipments are Industrial Robot, IP Camera, Workshop Tools, Parallel Robot Actuator and Controller, Pneumatics IoT Training Systems, Mechanical Simulator Software, PLC Training System.",
    bool: "first",
    state: "robotic-technology",
  },
  {
    lab: "Electronics and IoT",
    desc: "This section consists of the basic and advanced instruments to study the different behaviour of electronic circuits. This section is providing the focused, practical environment for students who want to learn the hands-on of Electronics design for innovation and Industrial Application. It offers in-depth learning of Electronics Circuit Design and Simulation with PCB designing followed by fabrication of the circuits and validation of the same. Benefits and features of this section are like hands-on experience of circuit design, hands-on experience of working with PCB Design and fabrication, acquire skills to do improved projects, knowledge of Electronic instruments and components, understanding schematic circuit design techniques, Involvement with live projects.",
    bool: "second",
    state: "electronics-and-iot",
  },
  {
    lab: "Data and Software Technology",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Excepturi distinctio facilis alias voluptatem, repudiandaebeatae delectus, nisi laudantium quae mollitia est praesentium.Debitis, similique exercitationem assumenda cupiditate odio ametreiciendis.",
    bool: "third",
    state: "data-and-software-technology",
  },
  {
    lab: "Animation and Game Design",
    desc: "India is emerging as an outsourcing hub for animation and visual effects with a large number of international media companies entering into joint ventures with animation studios in India. Gaming and Animation Design Unit will equip students and professionals with Industry-standard resources. The Unit primarily contains software used for design, animation and games. It has design softwares such as Solid Works. There will be CAD/CAM software such as SurfCAM and MasterCAM, which can be used with CNC programming for obtaining complex geometries and operations. Maya animation software will be used for animation, environment, motion graphics, virtual reality and character creation.",
    bool: "fourth",
    state: "animation-and-game-design",
  },
  {
    lab: "Electric Mobility",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Excepturi distinctio facilis alias voluptatem, repudiandaebeatae delectus, nisi laudantium quae mollitia est praesentium.Debitis, similique exercitationem assumenda cupiditate odio ametreiciendis.",
    bool: "fifth",
    state: "electric-mobility",
  },
  {
    lab: "Finanace Technology",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Excepturi distinctio facilis alias voluptatem, repudiandaebeatae delectus, nisi laudantium quae mollitia est praesentium.Debitis, similique exercitationem assumenda cupiditate odio ametreiciendis.",
    bool: "sixth",
    state: "finance-technology",
  },
  {
    lab: "Aeronautics and Space Technology",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Excepturi distinctio facilis alias voluptatem, repudiandaebeatae delectus, nisi laudantium quae mollitia est praesentium.Debitis, similique exercitationem assumenda cupiditate odio ametreiciendis.",
    bool: "seventh",
    state: "aeronautics-and-space-technology",
  },
  {
    lab: "Smart Manufacturing",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Excepturi distinctio facilis alias voluptatem, repudiandaebeatae delectus, nisi laudantium quae mollitia est praesentium.Debitis, similique exercitationem assumenda cupiditate odio ametreiciendis.",
    bool: "eighth",
    state: "smart-manufacturing",
  },
];

const Main = () => {
  const [currentOpener, setCurrentOpener] = useState("first");

  const showFeatureBool = (position) => {
    return position === currentOpener;
  };

  const showOpener = (position) => {
    setCurrentOpener(position);
  };

  return (
    <MainComponent>
      <section className="first-section">
        {/* <HeaderOne home className="main-header"> */}
        <img src={nvcti_logo} alt="nvcti-logo" />
        {/* </HeaderOne> */}
      </section>
      <section className="features">
        <HeaderTwo home className="features-header">
          NVCTI INVENTORY MANAGEMENT
        </HeaderTwo>
        {/* <p className="grey-para">
          Numerous features make it possible to customize the system in
          accordance with all your needs and still get the best out of it.
        </p> */}

        <div className="features-body">
          <div className="opener">
            {labInfo.map(({ lab, desc, bool }) => (
              <React.Fragment key={lab}>
                <FeatureClickParagraph
                  clicked={showFeatureBool(bool)}
                  onClick={() => showOpener(bool)}
                >
                  {lab}
                  <img className="dropdown" src={dropdown} alt="arrow icon" />
                </FeatureClickParagraph>
                <FeatureOpenedContent
                  mobileOpenerContent
                  showContent={showFeatureBool(bool)}
                >
                  <h3>{lab}</h3>
                  <p>{desc}</p>
                </FeatureOpenedContent>
              </React.Fragment>
            ))}
          </div>

          <div className="opener-content">
            {labInfo.map(({ lab, desc, bool, state }) => (
              <FeatureOpenedContent
                showContent={showFeatureBool(bool)}
                key={state}
              >
                <h3>{lab}</h3>
                <p>{desc}</p>
                <Link
                  to={{
                    pathname: "login",
                    state: { lab: state },
                  }}
                  className="get-started"
                >
                  Login as Lab-In-charge
                </Link>
              </FeatureOpenedContent>
            ))}
          </div>
        </div>
      </section>
    </MainComponent>
  );
};

export default Main;
