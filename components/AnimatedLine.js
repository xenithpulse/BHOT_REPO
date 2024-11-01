import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styled from "styled-components";

const AnimatedLineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  margin: 0 1rem;
  width: 3px;

  @media (min-width: 768px) {
    width: 5px;
  }

  background-color: blue;
  border-radius: 70%;
  height: 100%;
  box-shadow: rgba(105, 10, 176, 0.3) 0px 0px 5px;

  .animated-up-line {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #242424;
  }
`;

const AnimatedLine = ({ triggerElementId }) => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.to(".animated-up-line", {
      scrollTrigger: {
        scroller: "body",
        trigger: triggerElementId,
        scrub: true,
        start: "top 60%",
      },
      y: "100%",
    });
  });

  return (
    <AnimatedLineContainer ref={containerRef}>
      <div className="animated-up-line"></div>
    </AnimatedLineContainer>
  );
};

export default AnimatedLine;
