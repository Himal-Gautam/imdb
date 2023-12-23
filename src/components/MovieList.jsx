import MovieCard from "./MovieCard";

export default async function MovieList() {
  const {movies} = await getMovies();
  
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {movies?.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

async function getMovies() {
  const res = await fetch("http://localhost:3000/api/movies");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

