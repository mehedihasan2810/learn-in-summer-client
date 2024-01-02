import { CircularProgress, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Toast } from "../../../../Toast/Toast";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateClass = () => {
  // State variables for form validation and API loading
  const [isValid, setIsValid] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();
  const { addDashBoardTitle } = useAuthContext();

  // URL for imgbb image hosting
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

  // Custom Axios hook for secure requests
  const [axiosSecure] = useAxiosSecure();

  // React Router hook for accessing route parameters
  const params = useParams();

  const queryClient = useQueryClient();

  // React Query hook for fetching class details
  const {
    isLoading,
    error,
    data: myClass,
  } = useQuery(["myClass", params.id], async () => {
    const res = await axiosSecure.get(`/getClass/${params.id}`);
    return res.data;
  });

  // React Query mutation for updating a class
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.put(`/updateClass/${params.id}`, newData);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch query for "myClasses" after successful update
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });

  // Function to handle class update
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);

    // Extracting form data and converting it to an object
    const form_data = new FormData(e.target);
    const classInfo = Object.fromEntries(form_data);

    // Creating FormData for image upload
    const imgFormData = new FormData();
    imgFormData.append("image", classInfo.image);

    // Uploading image to imgbb and getting the result
    const imgUploadRes = await fetch(img_hosting_url, {
      method: "POST",
      body: imgFormData,
    });
    const imgUploadResult = await imgUploadRes.json();

    // Creating final class information object
    const finalClassInfo = {
      ...classInfo,
      image: imgUploadResult.success
        ? imgUploadResult.data.display_url
        : "https://i.ibb.co/yfYWFVK/logo2.jpg",
      date: new Date(),
    };

    // Triggering the mutation
    mutation.mutate(finalClassInfo);
    setIsApiLoading(false);

    // Navigating back to the classes list
    navigate("/dashboard/my-classes");

    // Displaying success message
    Toast.fire({
      icon: "success",
      title: "Updated successfully",
    });
  };

  // Effect hook to set dashboard title when the component mounts
  useEffect(() => {
    addDashBoardTitle("Update Class");
  }, []);

  // Loading message while data is being fetched
  if (isLoading) return "Loading...";

  // Displaying error message if there's an error fetching data
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
