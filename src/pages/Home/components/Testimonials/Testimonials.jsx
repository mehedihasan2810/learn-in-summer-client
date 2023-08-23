import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";
import { Autoplay, Pagination, Navigation } from "swiper";

const Testimonials = () => {
  // useEffect(() => {
  //   //  animate with gsap
  //   const tl = gsap.timeline({ paused: true });
  //   tl.fromTo(
  //     "#testimonial-header",
  //     { rotate: 360, x: -800 },
  //     { rotate: 0, x: 0 }
  //   );

  //   ScrollTrigger.create({
  //     animation: tl,
  //     trigger: "#testimonial-header",
  //     start: "top bottom",
  //     end: "top 30%",
  //     scrub: true,
  //   });
  //   //
  // }, []);

  return (
    <div className="center-container">
      <section className="testimonials">
        <div className="testimonial-header">
          <h2 className="section-title">Testimonials</h2>
          <p>See what our students say</p>
        </div>

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
            <div className="testimonial">
              <img
                src="https://images.unsplash.com/photo-1593698054590-a5b3a19565a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <div className="quote">
                <p>
                  {" "}
                  <q>
                    “I was about to give up on my dreams when I started Hans
                    Zimmer’s class. It was like someone gave me a slap in the
                    face. He said, “are you wasting your life or are you not
                    wasting your life? And that’s when I realized. I dont want
                    to waste another minute of it.”
                  </q>{" "}
                </p>
                <p className="name">
                  Jessica <span>Pianist, Canada</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <div className="testimonial">
              <img
                src="https://images.unsplash.com/photo-1554785015-34fc48ac73e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                alt=""
              />
              <div className="quote">
                <p>
                  {" "}
                  <q>
                    “I was about to give up on my dreams when I started Hans
                    Zimmer’s class. It was like someone gave me a slap in the
                    face. He said, “are you wasting your life or are you not
                    wasting your life? And that’s when I realized. I dont want
                    to waste another minute of it.”
                  </q>{" "}
                </p>
                <p className="name">
                  Jessica <span>Pianist, Canada</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <div className="testimonial">
              <img
                src="https://images.unsplash.com/photo-1631739714671-0de24b57d810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=758&q=80"
                alt=""
              />
              <div className="quote">
                <p>
                  {" "}
                  <q>
                    “I was about to give up on my dreams when I started Hans
                    Zimmer’s class. It was like someone gave me a slap in the
                    face. He said, “are you wasting your life or are you not
                    wasting your life? And that’s when I realized. I dont want
                    to waste another minute of it.”
                  </q>{" "}
                </p>
                <p className="name">
                  Jessica <span>Pianist, Canada</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <div className="testimonial">
              <img
                src="https://images.unsplash.com/photo-1535740560992-3a223ab7ef78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <div className="quote">
                <p>
                  {" "}
                  <q>
                    “I was about to give up on my dreams when I started Hans
                    Zimmer’s class. It was like someone gave me a slap in the
                    face. He said, “are you wasting your life or are you not
                    wasting your life? And that’s when I realized. I dont want
                    to waste another minute of it.”
                  </q>{" "}
                </p>
                <p className="name">
                  Jessica <span>Pianist, Canada</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;
