import { FaGraduationCap, FaRegClock } from "react-icons/fa";
import "./AllClasses.css";
const AllClasses = () => {
  return (
    <div className="center-container">
      <div className="all-classes-container">
        <h2 className="section-title">All Classes</h2>

        <div className="all-classes">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card">
              <img
                src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80"
                alt=""
              />
              <div className="price-category">
                <span className="category">Drum</span>
                <span>$70.22</span>
              </div>
              <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
              <h6>Mr Mehedi Hasan</h6>
              <div className="hrs-learners">
                <p>
                  {" "}
                  <FaRegClock /> 2 - 3 hrs
                </p>
                <p>
                  {" "}
                  <FaGraduationCap /> 21 seats available
                </p>
              </div>
              <div className="btns">
                <button className="btn-secondary">More Info</button>
                <button className="btn-primary">Start Learning</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
