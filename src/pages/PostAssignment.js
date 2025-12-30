import React, { useState } from "react";
import axios from "axios";

const PostAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/assignments", { title, description, postedBy })
      .then(res => { alert("Assignment posted!"); setTitle(""); setDescription(""); setPostedBy(""); })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Post Assignment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="Posted By" value={postedBy} onChange={e => setPostedBy(e.target.value)} required />
        <button type="submit">Post Assignment</button>
      </form>
    </div>
  );
};

export default PostAssignment;
