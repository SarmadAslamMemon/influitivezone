import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import Shape11 from "../../../public/assets/imgs/shape/11.png";
import Shape12 from "../../../public/assets/imgs/shape/12.png";
import Image from "next/image";
let Color;

if (typeof window !== "undefined") {
  Color = require("../../../public/assets/gsap-plugins/chroma.min").Color;
}

const Canvas = ({ bladeMode = "", ofCanvasArea }) => {
  const [accordion, setAccordion] = useState(0);
  const [subAccordion, setSubAccordion] = useState(0);
  const headerTitle = useRef();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        let rootParent = headerTitle.current?.children;
        if (rootParent) {
          for (let i = 0; i < rootParent.length; i++) {
            let firstParent = rootParent[i].children;
            for (let j = 0; j < firstParent.length; j++) {
              if (firstParent[j].className.includes("header_title")) {
                let arr = firstParent[j].children[0].textContent.split("");
                let spanData = "";
                for (let k = 0; k < arr.length; k++) {
                  if (arr[k] == " ") {
                    spanData += `<span style='width:2vw;'>${arr[k]}</span>`;
                  } else {
                    spanData += `<span>${arr[k]}</span>`;
                  }
                }
                let result = '<div class="menu-text">' + spanData + "</div>";
                firstParent[j].children[0].innerHTML = result;
              }
            }
          }
        }
      }, 10);
    }
  }, []);
  
  const openData = (data) => {
    setAccordion(data);
  };
  
  const openSubData = (data) => {
    setSubAccordion(data);
  };
  
  const closeCanvas = () => {
    ofCanvasArea.current.style.opacity = "0";
    ofCanvasArea.current.style.visibility = "hidden";
  };

  return (
    <>
      <div className="offcanvas__area" ref={ofCanvasArea}>
        <div className="offcanvas__body">
          <div className="offcanvas__left">
            <div className="offcanvas__logo">
              <Link href="/digital-agency">
                <Image
                  priority
                  style={{ width: "auto", height: "40px" }}
                  src={logoWhite2}
                  alt="Offcanvas Logo"
                />
              </Link>
            </div>
            <div className="offcanvas__social">
              <h3 className="social-title">Follow Us</h3>
              <ul>
                <li>
                  <a href="https://web.facebook.com/Influitivezone/">facebook</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/influitive-zone/">Linkedin</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/influitivezone/">Instagram</a>
                </li>
              </ul>
            </div>
            <div className="offcanvas__links">
              <ul>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">contact</Link>
                </li>
                <li>
                  <Link href="/blog">blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__mid">
            <div className="offcanvas__menu-wrapper">
              <nav className="offcanvas__menu">
                <ul className="menu-anim title" ref={headerTitle}>
                  <li>
                    <div className="header_title">
                       <Link href={"/digital-agency"}>HOME</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title">
                      <Link href={"/about"}>ABOUT</Link>
                    </div>
                  </li>
                  <li>
                     <div className="header_title">
                       <Link href={"/service"}>SERVICE</Link>
                        </div>
                      </li>
                  <li>
                    <div className="header_title">
                      <Link href={"/team"}>TEAM</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title">
                       <Link href={"/blog"}>BLOG</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title">
                      <Link href={"/portfolio"}>PORTFOLIO</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title">
                      <Link href={"/contact"}>CONTACT</Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="offcanvas__right">
            <div className="offcanvas__search">
            </div>
            <div className="offcanvas__contact">
              <h3>Get in touch</h3>
              <ul>
                <li>
                  <a href="tel:+18562520922">+1 856-252-0922</a>
                </li>
                <li>
                  <a href="mailto:info@influitivezone.com">info@influitivezone.com</a>
                </li>
                <li>
                55 Water St, PECK SLIP, NY 10038, United States, New York, NY, United States, New York</li>
              </ul>
            </div>
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape11}
              alt="shape"
              className="shape-1"
            />
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape12}
              alt="shape"
              className="shape-2"
            />
          </div>
          <div className="offcanvas__close">
            <button type="button" onClick={closeCanvas}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
