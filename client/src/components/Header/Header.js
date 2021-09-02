import React from "react";
import styled from "styled-components";

/*
--07 WhiteSpace
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128



*/

// const Wrapper = styled.section`
//   height: 6.4rem;
//   padding: 0 4.8rem;
//   background: #172b4d;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;
// `;

// const Title = styled.h1`
//   font-size: 3.2rem;
//   color: #fff;
// `;

export const Header = () => {
  return (
    <header class="header">
      <ion-icon name="camera-outline" class="header-icon"></ion-icon>
      <span class="logo-text">Memories</span>
    </header>
  );
};
