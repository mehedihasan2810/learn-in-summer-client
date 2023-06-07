import { useRef, useState } from "react";
import { FaRegClock, FaGraduationCap } from "react-icons/fa";
import "./PopularCourses.css";

const tabs = ["Popular", "Trending", "New", "Rated"];

const PopularCourses = () => {
    const [activeTab, setActiveTab] = useState('Popular');
    const underRef = useRef(null)
 
const handleTab = (e, index, tab) => {
  underRef.current.style.left = `calc(calc(100% / 4) * ${index})`;
  setActiveTab(tab)
}
  
  
  return (
    <div className="center-container">
      <section className="popular-classes-container">
        <h2>Popular Classes</h2>
        <div className="tab-container">
          {tabs.map((tab, index) => (
            <button 
            className={activeTab === tab ? 'active': ''}
              key={index} 
              onClick={(e) => handleTab(e, index,tab)}
            >
              {tab} Classes
            </button>
          ))}

          <span ref={underRef} className="under"></span>
        </div>
        <div className="card-container">


            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1188&q=80" alt="" />
                <p className="category">Drum</p>
                <h4>Basics of smashing drum so that ur neighbour cant sleep</h4>
                <div className="hrs-learners">
                    <p> <FaRegClock/> 2 - 3 hrs</p>
                    <p> <FaGraduationCap/> 7,703 learners</p>
                </div>
                <div className="btns">
                    <button className="btn-secondary">More Info</button>
                    <button className="btn-primary">Start Learning</button>
                </div>
            </div>



        </div>
      </section>
    </div>
  );
};

export default PopularCourses;
