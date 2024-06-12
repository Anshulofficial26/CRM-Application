import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error("An error occurred while fetching data:", err);
      setError("An error occurred while fetching data.");
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Deleted Successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      }
    } catch (err) {
      console.error("An error occurred while deleting data:", err);
      setError("An error occurred while deleting data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className='container my-2'>
      <h2 className='text-center'>All data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='row'>
        {data.map((ele) => (
          <div key={ele._id} className='col-3'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
                <button className="btn btn-danger" onClick={() => handleDelete(ele._id)}>
                  Delete
                </button>
                <Link to={`/${ele._id}`} className="btn btn-primary ms-2">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
