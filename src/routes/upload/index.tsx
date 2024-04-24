import { Button } from "@/components/ui/button";
import uploadVideo from "../../../lib/api/uploadVideo";
import React from "react";
import { getToken } from "@/lib/getToken";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();
  const [uploadedVideo, setUploadedVideo] = React.useState<string>("");
  const [uploadedThumbnail, setUploadedThumbnail] = React.useState<string>("");
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5 md:divide-x"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        const title = (document.getElementById("title") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("description") as HTMLInputElement
        ).value;
        const privacy = (
          document.getElementById("privacy") as HTMLSelectElement
        ).value;
        const thumbnail = (
          document.getElementById("thumbnail") as HTMLInputElement
        ).files?.[0];
        const video = (document.getElementById("video") as HTMLInputElement)
          .files?.[0];
        if (!title || !description || !privacy || !thumbnail || !video) {
          alert("Please fill in all the fields.");
          return;
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("privacy", privacy);
        // TODO: Add thumbnail to formData after implementation
        formData.append("thumbnail", "");
        formData.append("video", video);
        uploadVideo(formData, getToken() as string).then(() => {
          navigate(`/`);
        });
      }}
    >
      <div className="md:col-span-2 space-y-2">
        <h1 className="text-3xl font-bold ">Upload Video</h1>
        <p className="text-gray-500">
          Please enter the details of the video you want to upload.
        </p>
      </div>
      <div className="px-2">
        <div className="my-2">
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-400 rounded-md"
          ></textarea>
        </div>
        <div className="my-2">
          <label htmlFor="privacy" className="block font-semibold">
            Privacy
          </label>
          <select
            id="privacy"
            className="w-full p-2 border border-gray-400 rounded-md"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="thumbnail" className="block font-semibold">
            Select Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            className="w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setUploadedThumbnail(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {uploadedThumbnail === "" ? (
            <p className="flex flex-col items-center justify-center text-sm text-gray-500 mt-2">
              No thumbnail selected. Please select a thumbnail to upload.
            </p>
          ) : (
            <img
              src={uploadedThumbnail}
              alt="Thumbnail Preview"
              className="w-full mt-2"
            />
          )}
        </div>
      </div>
      <div className="px-2">
        <label htmlFor="video" className="block font-semibold">
          Select Video
        </label>
        <input
          type="file"
          id="video"
          className="w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setUploadedVideo(e.target?.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {uploadedVideo === "" ? (
          <p className="flex flex-col items-center justify-center text-sm text-gray-500 mt-2">
            No video selected. Please select a video to upload.
          </p>
        ) : (
          <video controls autoPlay className="w-full mt-2">
            <source src={uploadedVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="md:col-span-2 flex justify-end mx-5">
        <Button type="submit">Upload</Button>
      </div>
    </form>
  );
}
