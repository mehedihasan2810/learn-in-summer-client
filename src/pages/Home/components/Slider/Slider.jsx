import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.css";

import { Autoplay, Pagination, Navigation } from "swiper";
const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1611898979774-e202e8e9ffbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
          <div className="content">
            <h1>
              Here you will be able to learn playing guiter the badass way possible.
            </h1>
            <p>
              This one is one of our top rated course. You can check what our previous
              learner says in the review section.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper">
          {" "}
          <img
            src="https://images.pexels.com/photos/920992/pexels-photo-920992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="content">
            <h1>Learn Violin From The Master Himself.</h1>
            <p>
              Violin is the finest musical instrument ever human created and it
              is the most demandable instument as well.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper">
          {" "}
          <img
            src="https://images.pexels.com/photos/15864961/pexels-photo-15864961/free-photo-of-man-playing-on-synthesizer-on-stage-in-dark.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="content">
            <h1>Learn Piano Effectively</h1>
            <p>We have one of the best piano master who is ready to help you.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
