// pages/api/producers.js

import { connectMongoDB } from "@/lib/mongodb";
import Producer from "@/models/producer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const producers = await Producer.find();
    return NextResponse.json({ producers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching producers." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, gender, dob, bio } = await req.json();

    // Basic validation
    if (!name || !gender || !dob || !bio) {
      return NextResponse.json(
        { message: "Invalid input. Name, gender, dob, and bio are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const producer = await Producer.create({ name, gender, dob, bio });

    return NextResponse.json({ producer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding a producer." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, gender, dob, bio } = await req.json();

    // Basic validation
    if (!id || !name || !gender || !dob || !bio) {
      return NextResponse.json(
        {
          message:
            "Invalid input. ID, name, gender, dob, and bio are required.",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const producer = await Producer.findByIdAndUpdate(
      id,
      { name, gender, dob, bio },
      { new: true }
    );

    if (!producer) {
      return NextResponse.json(
        { message: "Producer not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ producer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating a producer." },
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
    const producer = await Producer.findByIdAndDelete(id);

    if (!producer) {
      return NextResponse.json(
        { message: "Producer not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Producer deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting a producer." },
      { status: 500 }
    );
  }
}
