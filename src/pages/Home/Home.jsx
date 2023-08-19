import { useTitlePerPage } from "../../hooks/useTitlePerPage";
import PopularCourses from "./components/PopularCourses/PopularCourses";
import PopularInstructors from "./components/PopularInstructors/PopularInstructors";
import Slider from "./components/Slider/Slider";
import Testimonials from "./components/Testimonials/Testimonials";
import Stats from "./components/stats/Stats";
import "./Home.css";

const Home = () => {
  useTitlePerPage("Home");

  return (
    <div>
      <div className="home-bottom-left-gradient"></div>
      <Slider />
      <Stats />
      <PopularCourses />
      <PopularInstructors />
      <Testimonials />
    </div>
  );
};

export default Home;
