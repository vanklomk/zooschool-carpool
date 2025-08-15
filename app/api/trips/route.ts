import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const {
      group_id,
      vehicle_id,
      title,
      pickup_location,
      destination,
      departure_time,
      return_time,
      max_passengers,
      description,
    } = body;

    // Validate required fields (adjust as needed for your schema)
    if (!group_id || !title || !pickup_location || !destination || !departure_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const insertData = {
      group_id,
      driver_id: session.user.id,
      vehicle_id: vehicle_id || null,
      title,
      pickup_location,
      destination,
      departure_time: new Date(departure_time).toISOString(),
      return_time: return_time ? new Date(return_time).toISOString() : null,
      max_passengers: max_passengers ?? 4,
      description: description || "",
      status: "scheduled",
    };

    const { data, error } = await supabaseAdmin
      .from("trips")
      .insert([insertData])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ trip: data }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Internal server error, tell Keith" }, { status: 500 });
  }
}
