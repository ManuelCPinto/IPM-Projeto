import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database";
import { and, eq } from "drizzle-orm";
import { likesTable } from "@/database/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const songId = parseInt(searchParams.get("songId") || "", 10);
  const userId = searchParams.get("userId");

  if (!songId || !userId) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    const like = await db
      .select()
      .from(likesTable)
      .where(and(eq(likesTable.songId, songId), eq(likesTable.userId, userId)))
      .get();

    return NextResponse.json({ isLiked: !!like }); // Return true if the like exists, false otherwise
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { error: "Failed to fetch like status" },
      { status: 500 }
    );
  }
}
