import React from "react";
import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <h1>
      <div className="row">
        <a href="/">ColbyDeH.art</a>
        <a
          href="https://twitter.com/colbydehart"
          style={{ marginLeft: "1rem", position: "relative", top: "0.5rem" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/twitter.png"
            alt="Twitter @colbydehart"
            height={30}
            width={30}
          />
        </a>
      </div>
      <hr />
    </h1>
  );
};
