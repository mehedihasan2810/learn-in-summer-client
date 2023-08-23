import { FaEnvelope, FaGraduationCap } from "react-icons/fa";
import "./InstructorCard.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
const InstructorCard = ({ user, resetAnimKey }) => {
  const instructorCardRef = useRef([]);
  useEffect(() => {
    //  gsap animaition
    const ctx = gsap.context(() => {
      instructorCardRef.current.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, delay: 0.2, ease: "power1.out" }
        );
      });
    }, instructorCardRef.current);

    return () => ctx.revert();
  }, [resetAnimKey]);
  return (
    <div  ref={(el) => instructorCardRef.current.push(el)} className="instructor-card">
      <img src={user.photoUrl} alt="" />

      <div className="body">
        <h3>{user.name}</h3>
        <p>{user.title}</p>
        <span>
          <FaGraduationCap /> {user.student_count} learners
        </span>
        <span className="email">
          {" "}
          <FaEnvelope /> {user.email}
        </span>
        <button className="btn">My class</button>
      </div>
    </div>
  );
};

export default InstructorCard;
