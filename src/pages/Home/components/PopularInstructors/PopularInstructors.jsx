import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "./PopularInstructors.css";

import { Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstructorCard from "../../../../shared-components/ui/InstructorCard/InstructorCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const PopularInstructors = () => {
  const [perView, setPerView] = useState(4);

  const [axiosSecure] = useAxiosSecure();
  // const { currentUser } = useAuthContext();

  const { data: users, isLoading } = useQuery({
    queryKey: ["manageUsers"],
    // enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUsers`);
      return res.data;
    },
  });

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
    <section className="home-instructor-container">
      <div className="center-container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="home-instructor-header">
            <h2 className="section-title">Top Instructors</h2>
            <button className="button-secondary">
              <Link to="#">Find Your Favorite Instructor</Link>
            </button>
          </div>

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
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton
                      key={index}
                      style={{ maxWidth: "320px", height: "470px" }}
                    />
                  </SwiperSlide>
                ))
              : users.map((user) => {
                  if (user.role !== "instructor") {
                    return;
                  }
                  return (
                    <SwiperSlide key={user._id}>
                      <InstructorCard user={user} />
                    </SwiperSlide>
                  );
                })}
            {/* <SwiperSlide>
              <div className="instructor-card">
                <img
                  src="https://images.pexels.com/photos/4038347/pexels-photo-4038347.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
                  src="https://images.pexels.com/photos/2614942/pexels-photo-2614942.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />

                <div className="body">
                  <h3>John Doe</h3>
                  <p>The best drum teacher in town</p>
                  <span>
                    <FaGraduationCap /> 6400 learners
                  </span>
                  <span className="email">
                    {" "}
                    <FaEnvelope /> johndoe@gmail.com
                  </span>
                  <button className="btn">watch class</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="instructor-card">
                <img
                  src="https://images.pexels.com/photos/1631666/pexels-photo-1631666.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />

                <div className="body">
                  <h3>Lewis Capaldi</h3>
                  <p>Award winnig violin teacher</p>
                  <span>
                    <FaGraduationCap /> 4200 learners
                  </span>
                  <span className="email">
                    {" "}
                    <FaEnvelope /> lewiscapaldi@gmail.com
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
                  src="https://images.pexels.com/photos/243989/pexels-photo-243989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />

                <div className="body">
                  <h3>Ed Sheeran</h3>
                  <p>The guiterist that you need to teach you</p>
                  <span>
                    <FaGraduationCap /> 7800 learners
                  </span>
                  <span className="email">
                    {" "}
                    <FaEnvelope /> edsheeran@gmail.com
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
            </SwiperSlide> */}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularInstructors;
