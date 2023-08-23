import "./AllClasses.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTitlePerPage } from "../../hooks/useTitlePerPage";
import ClassSkeletons from "../../skeletons/ClassSkeletons";
import { useState } from "react";
import ClassesCard from "../../shared-components/ui/ClassesCard/ClassesCard";
const AllClasses = () => {
  const [category, setCategory] = useState("all");
  const [axiosSecure] = useAxiosSecure();
  const { currentUser, toggleSignInSignUpModal, user_data } = useAuthContext();
  const queryClient = useQueryClient();

  useTitlePerPage("AllClasses");

  // fetch selected classes
  const { data: SelectedClassIds = [] } = useQuery({
    queryKey: ["SelectedClassIds", currentUser?.email],
    enabled: Boolean(currentUser),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getSelectedClassIds?email=${currentUser?.email}`
      );
      return res.data;
    },
  });
  // ----------------------------------------

  // fetch all the classes
  const {
    isLoading,
    error,
    data: allClasses = [],
  } = useQuery({
    queryKey: ["myClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allClasses");
      return res.data;
    },
  });
  // -------------------------------------

  // add selected class
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/addSelectedClass`, {
        email: currentUser?.email,
        id,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SelectedClassIds"] });
    },
  });
  // --------------------------------------------

  // open the signin/signup modal if the user is not signed in
  // when user clicks on the select button
  const handleSelectClass = (id) => {
    if (!currentUser) {
      toggleSignInSignUpModal();
      return;
    }
    mutation.mutate(id);
  };
  // -----------------------------------------

  // set the changes class category
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  // ---------------------------

  return (
    <div className="center-container">
      <div className="all-classes-container">
        <div className="all-classes-section-title-wrapper">
          <h2 className="all-classes-section-title">
            All Classes{" "}
            <span>
              (
              {isLoading
                ? "0"
                : allClasses.filter((classes) => classes.status === "approved")
                    .length}
              )
            </span>
          </h2>

          <Box sx={{ width: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter Class
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category_class"
                onChange={handleChange}
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
          {error && <h2>Error ocurred {error.message}</h2>}
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ClassSkeletons key={index} />
              ))
            : allClasses.map((classes) => {
                if (classes.status !== "approved") {
                  return;
                }

                if (category === "all") {
                  return (
                    <ClassesCard
                      key={classes._id}
                      classes={classes}
                      handleSelectClass={handleSelectClass}
                      SelectedClassIds={SelectedClassIds}
                      user_data={user_data}
                    />
                  );
                }

                if (classes.class_name.toLowerCase().startsWith(category)) {
                  return (
                    <ClassesCard
                      key={classes._id}
                      resetAnimKey={category}
                      classes={classes}
                      handleSelectClass={handleSelectClass}
                      SelectedClassIds={SelectedClassIds}
                      user_data={user_data}
                    />
                  );
                }
              })}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
