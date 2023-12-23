// components/MovieForm.js
"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

const MovieForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    poster: "",
    producer: "",
    actors: [],
  });

  // State for dropdown options
  const [actorOptions, setActorOptions] = useState([]);
  const [producerOptions, setProducerOptions] = useState([]);
  const router = useRouter();

  // Fetch actors and producers from API on component mount
  useEffect(() => {
    // // Replace these URLs with your actual API endpoints
    // const fetchActors = async () => {
    //   const response = await fetch("/api/actors");
    //   const data = await response.json();
    //   setActorOptions(data); // Assuming the API returns an array of actor options
    // };

    // const fetchProducers = async () => {
    //   const response = await fetch("/api/producers");
    //   const data = await response.json();
    //   setProducerOptions(data); // Assuming the API returns an array of producer options
    // };

    // fetchActors();
    // fetchProducers();
    setActorOptions([
      {
        _id: {
          $oid: "6584c2454633ff22fe8bd59e",
        },
        label: "Ottilie Applewhaite",
      },
      {
        _id: {
          $oid: "6584c2454633ff22fe8bd59f",
        },
        label: "Kessia Damant",
      },
      {
        _id: {
          $oid: "6584c2454633ff22fe8bd5a0",
        },
        label: "My Shouler",
      },
      {
        _id: {
          $oid: "6584c2454633ff22fe8bd5a1",
        },
        label: "Oralia Pratten",
      },
      {
        _id: {
          $oid: "6584c2454633ff22fe8bd5a2",
        },
        label: "Cosmo Gilham",
      },
    ]);
    setProducerOptions([
      {
        _id: {
          $oid: "6584c2954633ff22fe8c6f55",
        },
        label: "Eydie Farnell",
      },
      {
        _id: {
          $oid: "6584c2954633ff22fe8c6f56",
        },
        label: "Barbi Lebourn",
      },
      {
        _id: {
          $oid: "6584c2954633ff22fe8c6f57",
        },
        label: "Kelbee Stickles",
      },
      {
        _id: {
          $oid: "6584c2954633ff22fe8c6f58",
        },
        label: "Tadeas Gullane",
      },
      {
        _id: {
          $oid: "6584c2954633ff22fe8c6f59",
        },
        label: "Kayle Cathie",
      },
    ]);
  }, []);

  // Event handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Event handler for actor dropdown changes
  const handleActorChange = (selectedActors) => {
    setFormData({ ...formData, actors: selectedActors });
  };

  // Event handler for producer dropdown changes
  const handleProducerChange = (selectedProducer) => {
    setFormData({ ...formData, producer: selectedProducer });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., send data to the server
    console.log("Form submitted:", formData);
    // Reset the form
    setFormData({
      name: "",
      yearOfRelease: "",
      plot: "",
      poster: "",
      producer: "",
      actors: [],
    });
  };


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "gray",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "yellow",
    }),
  };


  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Movie Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter movie name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="yearOfRelease"
        >
          Year of Release
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="yearOfRelease"
          type="number"
          placeholder="Enter year of release"
          name="yearOfRelease"
          value={formData.yearOfRelease}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="plot"
        >
          Plot
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-yellow-400"
          id="plot"
          placeholder="Enter movie plot"
          name="plot"
          value={formData.plot}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="poster"
        >
          Poster URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="poster"
          type="text"
          placeholder="Enter poster URL"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="actors"
        >
          Actors
        </label>
        <Select
          isMulti
          options={actorOptions}
          onChange={handleActorChange}
          placeholder="Select actors"
          styles={customStyles}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="producer"
        >
          Producer
        </label>
        <Select
          options={producerOptions}
          onChange={handleProducerChange}
          placeholder="Select producer"
          styles={customStyles}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Movie
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => router.back()} // Assuming you're using Next.js router
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
