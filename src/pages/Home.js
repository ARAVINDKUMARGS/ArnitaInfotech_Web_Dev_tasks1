import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/assignments")
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Assignments</h1>
      {assignments.length === 0 ? <p>No assignments yet.</p> :
        <ul>
          {assignments.map(a => (
            <li key={a._id}><strong>{a.title}</strong>: {a.description} (Posted by {a.postedBy})</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Home;
