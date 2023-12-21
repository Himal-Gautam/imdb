// pages/api/actors.js

import { connectMongoDB } from "@/lib/mongodb";
import Actor from "@/models/actor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const actors = await Actor.find();
    return NextResponse.json({ actors }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching actors." },
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
    const actor = await Actor.create({ name, gender, dob, bio });

    return NextResponse.json({ actor }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding an actor." },
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
    const actor = await Actor.findByIdAndUpdate(
      id,
      { name, gender, dob, bio },
      { new: true }
    );

    if (!actor) {
      return NextResponse.json(
        { message: "Actor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ actor }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating an actor." },
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
    const actor = await Actor.findByIdAndDelete(id);

    if (!actor) {
      return NextResponse.json(
        { message: "Actor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Actor deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting an actor." },
      { status: 500 }
    );
  }
}
