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
          <h5>
            <FaPlay />
            <span>7000+</span>
          </h5>
          <p>Skill development courses are ready to make you skilled.</p>
        </div>
        <div className="item">
          <h5>
            <FaUsers />
            <span>20,000+</span>
          </h5>
          <p>Students use LearnInSummer to gain extra skill.</p>
        </div>
        <div className="item">
          <h5>
            <FaHandPeace />
            <span>15,000+</span>
          </h5>
          <p>
            Gave us reviews not just reviews but positive reviwes check for
            yourself.
          </p>
        </div>
        <div className="item">
          <h5>
            <FaChalkboardTeacher />
            <span>500+</span>
          </h5>
          <p>Best teachers from around the world are taking classes.</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
