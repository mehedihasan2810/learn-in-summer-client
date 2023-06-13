import { CircularProgress, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Toast } from "../../../../Toast/Toast";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateClass = () => {
  const [isValid, setIsValid] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const navigate = useNavigate();
  const { addDashBoardTitle } = useAuthContext();
  addDashBoardTitle("Update Class");

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

  const [axiosSecure] = useAxiosSecure();
  const params = useParams();
  console.log(params);

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: myClass,
  } = useQuery(["myClass", params.id], async () => {
    const res = await axiosSecure.get(`/getClass/${params.id}`);
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.put(`/updateClass/${params.id}`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  const handleUpdateClass = async (e) => {
    e.preventDefault();
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
      image: imgUploadResult.success
        ? imgUploadResult.data.display_url
        : "https://i.ibb.co/yfYWFVK/logo2.jpg",
      date: new Date(),
    };

    console.log(finalClassInfo);

    mutation.mutate(finalClassInfo);
    setIsApiLoading(false);

    navigate("/dashboard/my-classes");

    Toast.fire({
      icon: "success",
      title: "Updated successfully",
    });
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="center-container">
      <h2 className="section-title add-title">Update Class</h2>
      <div className="add-class-container ">
        <form onSubmit={handleUpdateClass}>
          <div className="row">
            <div className="control">
              <TextField
                defaultValue={myClass.class_name}
                id="outlined-basic"
                label="Class Name(drum, piano)"
                variant="outlined"
                name="class_name"
                required
              />
            </div>
            <div className="control">
              <TextField
                defaultValue={myClass.title}
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
                defaultValue={myClass.instructor_name}
                InputProps={{
                  readOnly: true,
                }}
                id="outlined-basic"
                label="Instructor Name"
                variant="outlined"
                name="instructor_name"
                required
              />
            </div>
            <div className="control">
              <TextField
                defaultValue={myClass.email}
                InputProps={{
                  readOnly: true,
                }}
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="control">
              <TextField
                defaultValue={myClass.available_seats}
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
                defaultValue={myClass.price}
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
                defaultValue={myClass?.duration}
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

export default UpdateClass;
