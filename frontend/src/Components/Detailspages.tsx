/* eslint-disable @typescript-eslint/no-unused-vars */
import Load from "../Animations/Load.tsx";
import Messagebugs from "../Animations/Messagebugs.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { format } from 'date-fns';
import { FaShare, FaRegCalendarAlt } from 'react-icons/fa';

// Define types for the response from the API
interface Sharing {
  success: boolean;
  fullName: string;
  email: string;
  imageUrls: string[];
  typeofservices: string;
  description: string;
  createdAt: string;
}


export default function Detailspages() {
  SwiperCore.use([Navigation]);
  const params = useParams<{ sharingId: string }>();
  
  const [sharing, setSharing] = useState<Sharing | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchSharing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/apis/aply/getbyid/${params.sharingId}`
        );
        const data: Sharing = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setSharing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    if (params.sharingId) {
      fetchSharing();
    }
  }, [params.sharingId]);

  const getMycopid = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <main className="">
      {loading && (
        <h1 className="LoadingpageContainer">
          <Load />
        </h1>
      )}
      {error && (
        <h1 className="LoadingpageContainer">
          <Messagebugs />
        </h1>
      )}

      {sharing && !loading && !error && (
        <div>
          <Swiper navigation>
            {sharing.imageUrls.map((imagurl, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[550px] relative object-cover"
                  style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imagurl}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="text-white text-4xl absolute bottom-10 right-0 left-0 px-5 font-bold">
                    <h1>{sharing.fullName}</h1>
                    <h3 className="text-xs text-gray-500">{sharing.email}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Links sharing */}
          <div className="flex items-center justify-center fixed top-[13%] right-[3%] z-10 tex gap-6">
            <div className="flex items-center ">
              <h1 className="text-white">{sharing.fullName}</h1>
            </div>

            <div className="w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:rounded-full">
              <FaShare className="text-base" onClick={getMycopid} />
            </div>
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-xl bg-slate-100 p-2">
              Success copied!
            </p>
          )}

          <div className="flex flex-col max-w-6xl mx-auto p-3 my-7 gap-4">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-green-700">
                <FaRegCalendarAlt />
                <span className="text-slate-950 text-sm">
                  {format(new Date(sharing.createdAt), 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
            <div className="text-slate-700 font-light text-3xl">
              <h1>{sharing.typeofservices}</h1>
            </div>
            <div className="text-slate-950 font-light text-xl">
              <h1>{sharing.description}</h1>
            </div>

            {/* Adding condition rendering in the page */}
          </div>
        </div>
      )}
    </main>
  );
}
