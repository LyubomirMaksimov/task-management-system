import React, { useState } from "react";
import styles from "./NavBar.module.css";
import TMSLogo from "../../assets/logo-mobile.svg";

import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";
import LinksContainer from "./LinksContainer";

const NavBar: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={TMSLogo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          Task Management System
        </p>
      </div>
      <div className={styles.navigation}>
        <LinksContainer mobile={false} onChoose={() => {}} />
      </div>

      <div className={styles.hamburger}>
        <GiHamburgerMenu
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      <MobileMenu show={showModal} setShow={setShowModal} />
    </nav>
  );
};

export default NavBar;
