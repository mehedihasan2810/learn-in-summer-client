import { CircularProgress, TextField } from "@mui/material";
import "./AddClass.css";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Toast } from "../../../../Toast/Toast";
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const AddClass = () => {
  const [isValid, setIsValid] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
  const [axiosSecure] = useAxiosSecure();

  const queryClient = useQueryClient();

  const { user_data, addDashBoardTitle } = useAuthContext();
  

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.post(`/addClass`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  const handleAddClass = async (e) => {
    e.preventDefault();

    try {
      setIsApiLoading(true);

      const form_data = new FormData(e.target);
      const classInfo = Object.fromEntries(form_data);

      const imgFormData = new FormData();
      imgFormData.append("image", classInfo.image);

      const imgUploadRes = await fetch(img_hosting_url, {
        method: "POST",
        body: imgFormData,
      });
      const imgUploadResult = await imgUploadRes.json();

      const finalClassInfo = {
        ...classInfo,
        price: +classInfo.price,
        available_seats: +classInfo.available_seats,
        image: imgUploadResult.success
          ? imgUploadResult.data.display_url
          : "https://i.ibb.co/yfYWFVK/logo2.jpg",
        enrolled: 0,
        feedback: null,
        date: new Date(),
        status: "pending",
      };

      mutation.mutate(finalClassInfo);

      setIsApiLoading(false);

      Toast.fire({
        icon: "success",
        title: "Added successfully",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error ocurred! Try again",
      });
      setIsApiLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    addDashBoardTitle("Add Class");
  }, [])

  return (
    <div className="center-container">
      <h2 className="section-title add-title">Add A Class</h2>
      <div className="add-class-container ">
        <form onSubmit={handleAddClass}>
          <div className="row">
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Class Name(drum, piano)"
                variant="outlined"
                name="class_name"
                required
              />
            </div>
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Class Title"
                variant="outlined"
                name="title"
                required
              />
            </div>
            {/* <div className="control">
              <input type="file" name="image" required />
            </div> */}
          </div>
          <div className="row">
            <div className="control">
              <TextField
                defaultValue={user_data.name}
                id="outlined-basic"
                label="Instructor Name"
                variant="outlined"
                name="instructor_name"
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div className="control">
              <TextField
                defaultValue={user_data?.email}
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                required
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="control">
              <TextField
                type="number"
                id="outlined-basic"
                label="Available Seats"
                variant="outlined"
                name="available_seats"
                required
              />
            </div>
            <div className="control">
              <TextField
                type="number"
                id="outlined-basic"
                label="Price($)"
                variant="outlined"
                name="price"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="control">
              <TextField
                onChange={(e) => {
                  const pattern = /^\d\d?:\d\d?$/;
                  if (pattern.test(e.target.value)) {
                    setIsValid(true);
                  } else {
                    setIsValid(false);
                  }
                }}
                error={!isValid}
                helperText={!isValid ? "00:00 or 0:0" : ""}
                id="outlined-basic"
                label="Class Duration(hrs:mins)"
                variant="outlined"
                name="duration"
              />
            </div>
            <div className="control">
              <input type="file" name="image" required />
            </div>
          </div>

          <button
            style={{
              backgroundColor: isApiLoading ? "rgba(14, 99, 197, 0.5)" : "",
            }}
            disabled={isApiLoading}
            className="btn-primary"
            type="submit"
          >
            {/* Add The Class */}
            {isApiLoading ? (
              <CircularProgress size={30} sx={{ color: "#fff" }} />
            ) : (
              "Add The Class"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
