import { FaEnvelope, FaGraduationCap } from 'react-icons/fa'
import './InstructorCard.css'
const InstructorCard = ({user}) => {
  return (
    <div className="instructor-card">
    <img
      src={user.photoUrl}
      alt=""
    />

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
  )
}

export default InstructorCard