"use client";

import Image from "next/image";
import { useState } from "react";

export default function MovieCard({ movie, onUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...movie });

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedMovie({ ...movie });
  };

  const handleSave = async () => {
    setIsEditMode(false);

    const response = await fetch(`/api/movies/${editedMovie._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMovie),
    });

    if (response.ok) {
      // Update the UI with the edited movie
      onUpdate(editedMovie);
      setIsEditMode(false);
    } else {
      // Handle error
      console.error("Failed to save changes");
    }
  };

  const handleChange = (field, value) => {
    setEditedMovie((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid w-80 place-items-center">
      <div className="card w-80 bg-base-100 shadow-xl">
        {isEditMode ? (
          <div className="p-5">
            <input
              style={{ maxWidth: "20rem" }}
              type="text"
              value={editedMovie.poster}
              onChange={(e) => handleChange("poster", e.target.value)}
            />
          </div>
        ) : (
          <figure className="aspect-w-11 aspect-h-17 justify-end">
            <Image
              src={editedMovie.poster || "https://picsum.photos/200/300"}
              width={325}
              height={200}
              alt="Movie Poster"
              className="object-cover"
            />
          </figure>
        )}
        <div className="card-body p-5">
          <h2 className="card-title">
            {isEditMode ? (
              <input
                style={{ maxWidth: "12.5rem" }}
                type="text"
                value={editedMovie.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              editedMovie.name
            )}
            <div className="badge badge-secondary">
              {isEditMode ? (
                <input
                  style={{ maxWidth: "6rem" }}
                  type="text"
                  value={editedMovie.yearOfRelease}
                  onChange={(e) =>
                    handleChange("yearOfRelease", e.target.value)
                  }
                />
              ) : (
                editedMovie.yearOfRelease
              )}
            </div>
          </h2>
          <h4>
            <b>Plot :</b>
          </h4>

          {isEditMode ? (
            <textarea
              style={{ width: "18rem", height: "5rem" }}
              value={editedMovie.plot}
              onChange={(e) => handleChange("plot", e.target.value)}
            />
          ) : (
            <p className="h-20 overflow-y-auto">{editedMovie.plot}</p>
          )}
          <div className="card-actions flex-col">
            <div className="badge badge-outline">Producer :</div>
            <div className="">
              {isEditMode ? (
                <input
                  style={{ maxWidth: "20rem" }}
                  type="text"
                  value={editedMovie.producer?.name}
                  onChange={(e) =>
                    handleChange("producer.name", e.target.value)
                  }
                />
              ) : (
                editedMovie.producer?.name
              )}
            </div>
            <div className="badge badge-outline">Actors :</div>
            <div>
              {isEditMode ? (
                // Assume editedMovie.actors is an array of actor objects
                <input
                  style={{ maxWidth: "20rem" }}
                  type="text"
                  value={editedMovie.actors
                    .map((actor) => actor.name)
                    .join(", ")}
                  onChange={(e) =>
                    handleChange(
                      "actors",
                      e.target.value.split(", ").map((name) => ({ name }))
                    )
                  }
                />
              ) : (
                editedMovie.actors.map((actor) => actor.name).join(", ")
              )}
            </div>
          </div>
          <div className="card-actions justify-end">
            {isEditMode && (
              <button className="btn" onClick={handleSave}>
                Save
              </button>
            )}
            <button
              className="btn"
              onClick={isEditMode ? handleCancel : handleEdit}
            >
              {isEditMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import { useState } from "react";

// export default function MovieCard({ movie }) {
//   const [isEditMode, setIsEditMode] = useState(false);

//   return (
//     <div className="grid place-items-center">
//       <div className="card w50 bg-base-100 shadow-xl">
//         <figure className="aspect-w-11 aspect-h-17">
//           <Image
//             src={movie.poster || "https://picsum.photos/200/300"}
//             width={325}
//             height={200}
//             alt="Movie Poster"
//             className="object-cover"
//           />
//         </figure>
//         <div className="card-body p-5">
//           <h2 className="card-title">
//             {movie.name}
//             <div className="badge badge-secondary">{movie.yearOfRelease}</div>
//           </h2>
//           <h4>
//             <b>Plot :</b>
//           </h4>
//           <p className="h-20 overflow-y-auto">{movie.plot}</p>
//           <div className="card-actions flex-col">
//             <div className="badge badge-outline">Producer :</div>
//             <div className="">{movie.producer?.name}</div>
//             <div className="badge badge-outline">Actors :</div>
//             <div>
//               {movie.actors.map((actor, index) => (
//                 <i key={actor._id}>
//                   {actor.name}
//                   {index < movie.actors.length - 1 && ", "}
//                 </i>
//               ))}
//             </div>
//           </div>
//           <div className="card-actions justify-end">
//             {isEditMode && (
//               <button class="btn" onClick={() => handleSave()}>
//                 Save
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 cursor-pointer"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </button>
//             )}
//             <button
//               class="btn"
//               onClick={() => {
//                 setIsEditMode(!isEditMode);
//               }}
//             >
//               {isEditMode ? "Cancel" : "Edit"}
//               {!isEditMode ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 cursor-pointer"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 cursor-pointer"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
