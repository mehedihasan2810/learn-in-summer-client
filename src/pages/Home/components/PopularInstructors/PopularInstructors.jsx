import { FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./PopularInstructors.css";

import { Navigation, Pagination } from "swiper";

const PopularInstructors = () => {
  return (
    <div className="center-container">
      <h2 className="section-title">Popular Instructors</h2>
      <Swiper
        slidesPerView={4}
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
    </div>
  );
};

export default PopularInstructors;
