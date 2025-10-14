import { useEffect, useRef, useState } from "react";
import allNavData from "../../../data/navData.json";
import Preloader from "@/components/preloader/Preloader";
import CommonAnimation from "../CommonAnimation";
import ScrollSmootherComponents from "../ScrollSmootherComponents";
import CursorAnimation from "../CursorAnimation";

import Header3 from "@/components/header/Header3";
import Footer1 from "@/components/footer/Footer1";
import CollapsibleContactForm from "@/components/contact/CollapsibleContactForm";

export default function RootLayout({
  children,
  defaultMode = "",
}) {
  const [mode, setMode] = useState(defaultMode);
  const [navData, setNavData] = useState({});

  const cursor1 = useRef();
  const cursor2 = useRef();
  useEffect(() => {
    setNavData(allNavData);
    if (typeof window !== "undefined") {
      if (mode == "dark") {
        document.querySelector("body").classList.add("dark");
      } else {
        document.querySelector("body").classList.remove("dark");
      }
    }
  }, [mode]);
  return (
    <>
      <CommonAnimation>
        <div className="has-smooth" id="has_smooth"></div>
        <ScrollSmootherComponents />
        <div className="cursor" id="team_cursor">
          Drag
        </div>
        <Preloader />
        <CursorAnimation cursor1={cursor1} cursor2={cursor2} />

        <Header3 navData={navData} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <Footer1 />
          </div>
        </div>
        <CollapsibleContactForm />
      </CommonAnimation>
    </>
  );
}
