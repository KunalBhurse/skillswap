import { useEffect, useState } from "react";
import API from "../api/taskApi";

export default function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const res = await API.get("/applications");

      setApplications(res.data);

    } catch (err) {
      console.error(err);
    }
  };

 

  return (

    <div className="min-h-screen bg-[#030B24] text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Applications
      </h1>

      <div className="space-y-6">

        {applications
          .filter(app => app.taskId)
          .map((app) => (

            <div
              key={app._id}
              className="bg-[#0A1638] border border-[#1D2D5C] rounded-2xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {app.taskId?.title || "Task Deleted"}
              </h2>

              <p className="text-gray-400 mt-2">

                {app.taskId?.category || "N/A"}

              </p>

              <p className="mt-3">

                Budget :
                <span className="text-[#F6D66E]">
                  {" "}
                  {app.taskId?.budget || 0} NIM
                </span>

              </p>

              <p className="mt-3">

                Delivery :
                {" "}
                {app.deliveryDays} Days

              </p>

              <p className="mt-3">

                Status :

                <span className="ml-2 text-yellow-400">

                  {app.status}

                </span>

              </p>

            </div>

          ))}

      </div>

    </div>

  );

}