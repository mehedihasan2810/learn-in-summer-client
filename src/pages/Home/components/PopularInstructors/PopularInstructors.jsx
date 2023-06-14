import { FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "./PopularInstructors.css";

import { Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [perView, setPerView] = useState(4);

  useEffect(() => {
    const mediaQuery2 = window.matchMedia("(max-width: 1024px)");
    const mediaQuery1 = window.matchMedia("(max-width: 768px)");

    const handleChange2 = (event) => {
      if (event.matches) {
        setPerView(2);
      } else {
        setPerView(4);
      }
    };

    mediaQuery2.addEventListener("change", handleChange2);

    const handleChange1 = (event) => {
      if (event.matches) {
        setPerView(1);
      } else {
        setPerView(2);
      }
    };

    mediaQuery1.addEventListener("change", handleChange1);

    return () => {
      mediaQuery1.removeEventListener("change", handleChange1);
      mediaQuery2.removeEventListener("change", handleChange2);
    };
  }, []);

  return (
    <div className="center-container">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <h2 className="section-title">Popular Instructors</h2>
        <Swiper
          slidesPerView={perView}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <span className="email">
                  {" "}
                  <FaEnvelope /> mehedihasan12@gmail.com
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <span className="email">
                  {" "}
                  <FaEnvelope /> mehedihasan12@gmail.com
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <span className="email">
                  {" "}
                  <FaEnvelope /> mehedihasan12@gmail.com
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <span className="email">
                  {" "}
                  <FaEnvelope /> mehedihasan12@gmail.com
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <span className="email">
                  {" "}
                  <FaEnvelope /> mehedihasan12@gmail.com
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="instructor-card">
              <img
                src="https://images.unsplash.com/photo-1467493330285-2fe6a9f97483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />

              <div className="body">
                <h3>Mehedi Hasan</h3>
                <p>Teaches Piano in the best way possible</p>
                <span>
                  <FaGraduationCap /> 6400 learners
                </span>
                <button className="btn">watch class</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default PopularInstructors;
