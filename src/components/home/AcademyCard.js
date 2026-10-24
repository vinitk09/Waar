"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const imageSizes = "(max-width: 767px) 100vw, (max-width: 1480px) 50vw, 670px";

export default function AcademyCard({ academy, index }) {
  const [active, setActive] = useState(0);
  const [flight, setFlight] = useState(null);
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const thumbnailRef = useRef(null);
  const flightRef = useRef(null);
  const photos = [
    { src: `/images/${academy.slug}/${academy.slug}1.jpeg`, alt: academy.paradeAlt, position: academy.position },
    { src: `/images/${academy.slug}/${academy.slug}2.jpeg`, alt: academy.campusAlt, position: "center" },
  ];
  const next = 1 - active;

  useLayoutEffect(() => {
    if (!flight) return;
    const animation = flightRef.current.animate(
      [flight.from, flight.to],
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
    animation.finished.then(() => {
      setActive(flight.next);
      setFlight(null);
    }).catch(() => {});
    return () => animation.cancel();
  }, [flight]);

  function swapPhoto() {
    if (flight) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(next);
      return;
    }
    const card = cardRef.current.getBoundingClientRect();
    const thumbnail = thumbnailRef.current.getBoundingClientRect();
    const frame = frameRef.current.getBoundingClientRect();
    const rectangle = (rect, radius) => ({
      left: `${rect.left - card.left - cardRef.current.clientLeft}px`,
      top: `${rect.top - card.top - cardRef.current.clientTop}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: radius,
    });
    setFlight({ next, from: rectangle(thumbnail, "8px"), to: rectangle(frame, "0px") });
  }

  return (
    <figure ref={cardRef} className="relative overflow-hidden rounded-2xl border border-[#e3d5db] bg-white shadow-[0_6px_24px_-16px_#291e2430]">
      <div ref={frameRef} id={`academy-frame-${academy.slug}`} className="relative aspect-[16/9] overflow-hidden bg-[#e9e1e4]">
        {photos.map((photo, photoIndex) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photoIndex === active ? photo.alt : ""}
            aria-hidden={photoIndex !== active}
            fill
            sizes={imageSizes}
            style={{ objectPosition: photo.position, opacity: photoIndex === active ? 1 : 0 }}
            className="object-cover"
          />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
        <span className="pointer-events-none absolute top-4 left-4 z-20 rounded-full border border-white/35 bg-[#291e24]/55 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm sm:top-5 sm:left-5">{academy.short}</span>
        <span aria-hidden="true" className="pointer-events-none absolute top-5 right-5 z-20 font-mono text-xs text-white/80">0{index + 1}</span>
        <p className="pointer-events-none absolute bottom-5 left-5 z-20 max-w-[60%] text-lg leading-snug font-medium text-white sm:bottom-6 sm:left-6 sm:text-xl">{academy.label}</p>
      </div>
      <figcaption className="relative min-h-[130px] p-5 sm:min-h-[145px] sm:p-6">
        <div className="max-w-[60%] pr-2">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#780c24] uppercase">{academy.short}</p>
          <h3 className="mt-2 text-base leading-snug font-semibold tracking-tight text-[#302830] sm:text-xl">{academy.name}</h3>
        </div>
        <button
          ref={thumbnailRef}
          type="button"
          onClick={swapPhoto}
          aria-label={`Show ${active === 0 ? "campus" : "parade"} photo of ${academy.name} in the large frame`}
          aria-controls={`academy-frame-${academy.slug}`}
          aria-disabled={Boolean(flight)}
          className="group absolute -top-8 right-4 z-30 aspect-[4/3] w-[34%] cursor-pointer overflow-hidden rounded-lg border-4 border-white bg-[#e9e1e4] shadow-[0_8px_20px_-8px_#291e2450] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#780c24] aria-disabled:cursor-wait sm:-top-10 sm:right-6"
        >
          <Image src={photos[next].src} alt="" fill sizes={imageSizes} style={{ objectPosition: photos[next].position }} className="object-cover" />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pt-5 pb-2 text-center text-[10px] font-medium text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">Click to view</span>
        </button>
        <span role="status" className="sr-only">Showing {active === 0 ? "parade" : "campus"} photo of {academy.name}.</span>
      </figcaption>
      {flight && (
        <div ref={flightRef} aria-hidden="true" className="pointer-events-none absolute z-10 overflow-hidden bg-[#e9e1e4]" style={flight.from}>
          <Image src={photos[flight.next].src} alt="" fill sizes={imageSizes} style={{ objectPosition: photos[flight.next].position }} className="object-cover" />
        </div>
      )}
    </figure>
  );
}
