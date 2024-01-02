import {
  FaPlay,
  FaUsers,
  FaHandPeace,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "./Stats.css";
const Stats = () => {
  return (
    <section className="center-container">
      <div className="stat-container">
        <div className="item">
          <div className="stat-num">
            <FaPlay />
            <span>7000+</span>
          </div>
          <p>Skill development courses are ready to make you skilled.</p>
        </div>
        <div className="item">
          <div className="stat-num">
            <FaUsers />
            <span>20,000+</span>
          </div>
          <p>Students use LearnInSummer to gain extra skill.</p>
        </div>
        <div className="item">
          <div className="stat-num">
            <FaHandPeace />
            <span>15,000+</span>
          </div>
          <p>
            Gave us reviews not just reviews but positive reviwes check for
            yourself.
          </p>
        </div>
        <div className="item">
          <div className="stat-num">
            <FaChalkboardTeacher />
            <span>500+</span>
          </div>
          <p>Best teachers from around the world are taking classes.</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
