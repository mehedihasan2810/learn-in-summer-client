import "./fallback.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Skeleton from "react-loading-skeleton";
const InstructorsFallback = () => {
  return (
    <div className="instructors-fallback-container">
    <div className="center-container">
      <div className="instructors-container">
        <div className="instructors-title-wrapper">
          <h2 className="instructors-section-title">
            Instructors <span>(0)</span>
          </h2>

          <Box sx={{ width: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter Instructors
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value='all'
                label="instructor_type"
                disabled
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
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  style={{ maxWidth: "320px", height: "470px" }}
                />
              ))}
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default InstructorsFallback;
