import "./Instructors.css";
import { useTitlePerPage } from "../../hooks/useTitlePerPage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InstructorCard from "../../shared-components/ui/InstructorCard/InstructorCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
const Instructors = () => {
  const [instructorType, setInstructorType] = useState("all");
  useTitlePerPage("Instructors");

  const [axiosSecure] = useAxiosSecure();
  // const { currentUser } = useAuthContext();

  const { data: users, isLoading } = useQuery({
    queryKey: ["manageUsers"],
    // enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUsers`);
      return res.data;
    },
  });

  const handleChange = (event) => {
    setInstructorType(event.target.value);
  };

  return (
    <div className="center-container">
      <div className="instructors-container">
        <div className="instructors-title-wrapper">
          <h2 className="instructors-section-title">
            Instructors{" "}
            <span>
              (
              {users
                ? users.filter((user) => user.role === "instructor").length
                : "0"}
              )
            </span>
          </h2>

          <Box sx={{ width: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter Instructors
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={instructorType}
                label="instructor_type"
                onChange={handleChange}
              >
                <MenuItem value="all">All Instructors</MenuItem>
                <MenuItem value="drum">Drum Instructors</MenuItem>
                <MenuItem value="guiter">Guiter Instructors</MenuItem>
                <MenuItem value="piano">Piano Instructors</MenuItem>
                <MenuItem value="violin">Violin Instructors</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="instructors">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  style={{ maxWidth: "320px", height: "470px" }}
                />
              ))
            : users?.map((user) => {
                if (user.role !== "instructor") {
                  return;
                }

                if (instructorType === "all") {
                  return (
                    <InstructorCard
                      key={user._id}
                      user={user}
                      resetAnimKey={instructorType}
                    />
                  );
                }

                if (instructorType === user.type) {
                  return (
                    <InstructorCard
                      key={user._id}
                      user={user}
                      resetAnimKey={instructorType}
                    />
                  );
                }
              })}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
