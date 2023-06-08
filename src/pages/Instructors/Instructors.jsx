import { FaGraduationCap, FaEnvelope } from "react-icons/fa";
import "./Instructors.css";
const Instructors = () => {
  console.log(Array.from({ length: 10 }));
  return (
    <div className="center-container">
      <div className="instructors-container">
        <h2 className="section-title">Instructors</h2>

        <div className="instructors">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="instructor">
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
                <span className="email"> <FaEnvelope/> mehedihasan12@gmail.com</span>
                <button className="btn">watch class</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
