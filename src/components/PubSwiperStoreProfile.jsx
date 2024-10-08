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
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";

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
];

export default function PubSwiperStoreProfile() {
  const [DeletePub, setDeletePub] = useState(false);
  const handleOpenDeletePub = () => {
    setDeletePub(true);
  };
  const handleCloseDeletePub = () => {
    setDeletePub(false);
  };
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[FreeMode, Pagination]}
        className="pubSwiper"
      >
        {DataPub.map((pub) => (
          <SwiperSlide key={pub.id} className="swiperSlide">
            <XMarkIcon
              className="h-6 w-6 trashIcon text-red-500 cursor-pointer hover:text-red-700"
              onClick={handleOpenDeletePub}
            />
            <img src={pub.image} alt={pub.name} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ConfirmDialog
        open={DeletePub}
        onClose={handleCloseDeletePub}
        dialogTitle={"Confirm Publicité Deletion"}
        dialogContentText={`Are you sure you want to delete this publicité?`}
      />
    </>
  );
}
