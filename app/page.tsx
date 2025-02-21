import apiClient from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
   const [videos, setVideos] =  useState<IVideo[]>([])

   useEffect(() => {
    const fecthVideos = async () => {
      try {
        const data = await apiClient.getVideos()
        setVideos(data)
        
      } catch (error) {
        console.error("Error fetching videos:", error);
        
      }
    }

    fecthVideos()
   }, [])

  return (
   <div>
    <h1>
      Home
    </h1>
   </div>
  );
}
