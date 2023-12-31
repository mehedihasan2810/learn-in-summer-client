import { FaGraduationCap, FaRegClock } from "react-icons/fa";
import "./ClassesCard.css";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
const ClassesCard = ({
  classes,
  handleSelectClass,
  SelectedClassIds,
  user_data,
  resetAnimKey,
}) => {

   // Reference to store class card elements for animation
  const classCardRef = useRef([]);

  // Effect to run GSAP animation when resetAnimKey changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      classCardRef.current.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, delay: 0.2, ease: "power1.out" }
        );
      });
    }, classCardRef.current);

     // Cleanup the animation context on component unmount
    return () => ctx.revert();
  }, [resetAnimKey]);
  return (
    <div
      ref={(el) => classCardRef.current.push(el)}
      key={classes._id}
      className={
        classes.available_seats == 0 ? "classes-card no-seats" : "classes-card"
      }
    >
      <img src={classes.image} alt="" width={300} height={200} />
      <div className="price-category">
        <span className="category">{classes.class_name}</span>
        <span>${classes.price}</span>
      </div>
      <p className="title">{classes.title}</p>
      <p>{classes.instructor_name}</p>
      <div className="hrs-learners">
        <p>
          {" "}
          <FaRegClock /> {classes.duration} hrs
        </p>
        <p>
          {" "}
          <FaGraduationCap /> {classes.available_seats} seats available
        </p>
      </div>
      <div className="btns">
        <Button variant="outlined" size="large">
          More Info
        </Button>
        <Button
          disabled={
            SelectedClassIds?.selectedClassIds?.includes(classes._id) ||
            classes.available_seats == 0 ||
            user_data?.role === "admin" ||
            user_data?.role === "instructor"
          }
          onClick={() => handleSelectClass(classes._id)}
          variant="contained"
          size="large"
        >
          {SelectedClassIds?.selectedClassIds?.includes(classes._id)
            ? "Selected"
            : "Select"}
        </Button>
      </div>
    </div>
  );
};

export default ClassesCard;
