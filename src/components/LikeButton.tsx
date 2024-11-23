import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
  songId: number;
  userId: string; // User ID
}

export const LikeButton: React.FC<LikeButtonProps> = ({ songId, userId }) => {
  const [liked, setLiked] = useState<boolean | null>(null);

  // Fetch the initial liked status
  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await fetch(`/api/like/status?songId=${songId}&userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch like status");
        }
        const data = await response.json();
        setLiked(data.isLiked);
      } catch (error) {
        console.error("Error fetching like status:", error);
        toast.error("Failed to fetch like status");
      }
    };

    fetchLikedStatus();
  }, [songId, userId]);

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/like`, {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId, userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${liked ? "unlike" : "like"} the song`);
      }

      setLiked(!liked); // Toggle the liked state
      toast.success(liked ? "Removed from likes" : "Added to likes");
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Something went wrong");
    }
  };

  // Display loading state until the like status is fetched
  if (liked === null) {
    return (
      <button
        className="like-button text-gray-500"
        aria-label="Loading like status"
        disabled
      >
        ♥
      </button>
    );
  }

  return (
    <button
      onClick={toggleLike}
      className="like-button"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <span
        className={`transition-colors duration-200 ${
          liked ? "text-red-500" : "text-white"
        }`}
      >
        ♥
      </span>
    </button>
  );
};
