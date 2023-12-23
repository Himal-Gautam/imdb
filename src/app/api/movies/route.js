// pages/api/movies.js

import { connectMongoDB } from "@/lib/mongodb";
import Movie from "@/models/movie";
import Actor from "@/models/actor";
import Producer from "@/models/producer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const movies = await Movie.find().populate("producer").populate("actors");
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching movies." },
      
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, yearOfRelease, plot, poster, actors, producer } =
      await req.json();

    // Basic validation
    if (!name || !yearOfRelease || !plot || !producer || actors?.length == 0) {
      return NextResponse.json(
        {
          message:
            "Invalid input. Name, yearOfRelease, plot, actors and producer are required.",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const movie = await Movie.create({
      name,
      yearOfRelease,
      plot,
      poster,
      actors,
      producer,
    });

    return NextResponse.json({ movie }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding a movie." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, yearOfRelease, plot, poster, actors, producer } =
      await req.json();

    // Basic validation
    if (
      !id ||
      !name ||
      !yearOfRelease ||
      !plot ||
      !producer ||
      actors?.length == 0
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid input. ID, name, yearOfRelease, plot, actors and producer are required.",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const movie = await Movie.findByIdAndUpdate(
      id,
      { name, yearOfRelease, plot, poster, actors, producer },
      { new: true }
    );

    if (!movie) {
      return NextResponse.json(
        { message: "Movie not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating a movie." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json(
        { message: "Invalid input. ID is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return NextResponse.json(
        { message: "Movie not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Movie deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting a movie." },
      { status: 500 }
    );
  }
}
