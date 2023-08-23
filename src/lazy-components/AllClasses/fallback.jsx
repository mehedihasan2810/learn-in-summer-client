import ClassSkeletons from "../../skeletons/ClassSkeletons";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./fallback.css";
const AllClassesFallback = () => {
  return (
    <div className="all-calsses-fallback">
      <div className="center-container">
        <div className="all-classes-container">
          <div className="all-classes-section-title-wrapper">
            <h2 className="all-classes-section-title">
              All Classes <span>(0)</span>
            </h2>

            <Box sx={{ width: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="all"
                  label="category_class"
                  // onChange={handleChange}
                  disabled={true}
                >
                  <MenuItem value="all">All Class</MenuItem>
                  <MenuItem value="drum">Drum Class</MenuItem>
                  <MenuItem value="guiter">Guiter Class</MenuItem>
                  <MenuItem value="piano">Piano Class</MenuItem>
                  <MenuItem value="violin">Violin Class</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="all-classes">
            {Array.from({ length: 8 }).map((_, index) => (
              <ClassSkeletons key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClassesFallback;
