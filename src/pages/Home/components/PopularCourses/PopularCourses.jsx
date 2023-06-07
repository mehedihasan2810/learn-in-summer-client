import { useRef, useState } from "react";
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
      </section>
    </div>
  );
};

export default PopularCourses;
