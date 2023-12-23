import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="grid place-items-center">
      <div className="card w50 bg-base-100 shadow-xl">
        <figure className="aspect-w-11 aspect-h-17">
          <Image
            src={movie.poster || "https://picsum.photos/200/300"}
            width={325}
            height={200}
            alt="Movie Poster"
            className="object-cover"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title">
            {movie.name}
            <div className="badge badge-secondary">{movie.yearOfRelease}</div>
          </h2>
          <h4>
            <b>Plot :</b>
          </h4>
          <p className="h-20 overflow-y-auto">{movie.plot}</p>
          <div className="card-actions flex-col">
            <div className="card-actions">
              <div className="badge badge-outline">Producer :</div>
              <div className="">{movie.producer}</div>
            </div>
            <div className="card-actions flex-col">
              <div className="badge badge-outline">Actors :</div>
              {movie.actors.map((actor) => (
                <div key={actor}>{actor}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

