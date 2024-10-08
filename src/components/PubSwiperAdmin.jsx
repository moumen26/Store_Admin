import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Pub1 from "../assets/Photos/Pub1.png";
import Pub2 from "../assets/Photos/Pub2.png";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const DataPub = [
  {
    id: 1,
    name: "Pub 1",
    image: Pub1,
  },
  {
    id: 2,
    name: "Pub 2",
    image: Pub2,
  },
  {
    id: 2,
    name: "Pub 2",
    image: Pub2,
  },
  {
    id: 2,
    name: "Pub 2",
    image: Pub2,
  },
  {
    id: 2,
    name: "Pub 2",
    image: Pub2,
  },
];

export default function PubSwiperAdmin() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
       
        modules={[FreeMode, Pagination]}
        className="pubSwiper"
      >
        {DataPub.map((pub) => (
          <SwiperSlide key={pub.id} className="swiperSlide relative">
            
            <img src={pub.image} alt={pub.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
