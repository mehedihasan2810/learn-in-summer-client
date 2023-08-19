import Skeleton from "react-loading-skeleton";
import "./ClassSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";
const ClassSkeletons = () => {
  return (
    <div className="class-skeleton-wrapper">
      <Skeleton style={{ height: "200px" }} />
      <div className="skeleton-price-category">
        <Skeleton style={{ height: "20px", width: "80px" }} />
        <Skeleton style={{ height: "20px", width: "80px" }} />
      </div>
      <Skeleton style={{ height: "20px", width: "100%" }} />
      <div className="skeleton-seat-time">
        <Skeleton style={{ height: "20px", width: "80px" }} />
        <Skeleton style={{ height: "20px", width: "80px" }} />
      </div>
      <div className="skeleton-btns">
        <Skeleton style={{ height: "50px", width: "100px" }} />
        <Skeleton style={{ height: "50px", width: "100px" }} />
      </div>
    </div>
  );
};

export default ClassSkeletons;
