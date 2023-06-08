import { TextField } from "@mui/material";
import "./AddClass.css";
const AddClass = () => {
  const handleAddClass = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data);
    console.log(data);
  };

  return (
    <div className="center-container">
      <h2 className="section-title add-title">Add A Class</h2>
      <div className="add-class-container ">
        <form onSubmit={handleAddClass}>
          <div className="row">
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Class Name"
                variant="outlined"
                name="class_name"
              />
            </div>
            <div className="control">
              <input type="file" name="image" />
            </div>
          </div>
          <div className="row">
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Instructor Name"
                variant="outlined"
                name="instructor_name"
              />
            </div>
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Available Seats"
                variant="outlined"
                name="available_seats"
              />
            </div>
            <div className="control">
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                name="price"
              />
            </div>
          </div>

          <button className="btn-primary" type="submit">
            Add The Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
