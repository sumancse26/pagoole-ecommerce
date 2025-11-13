"use client";

import Link from "next/link";


export default function PagooleLogo() {
  const colors = [
    "rgb(234, 67, 53)",  // P
    "rgb(66, 133, 244)", // a
    "#00C853",           // g
    "rgb(251, 188, 5)",  // o
    "#00C853",           // o
    "rgb(66, 133, 244)", // l
    "rgb(234, 67, 53)",  // e
  ];

  const text = "Pagoole";
const bg = 'transparent';
const textShadow = 'none';
  return (
    <Link
      href="https://pagoole.com/"
      aria-label="Pagoole Home"
      className="inline-flex items-center tracking-tight select-none align-baseline"
      style={{
        background: bg,
        textShadow,
        lineHeight: "1",
        fontSize: "inherit", 
      }}
    >
      {text.split("").map((char, i) => (
        <span key={i} style={{ color: colors[i] }}>
          {char}
        </span>
      ))}
    </Link>
  );
}
