"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  let [longUrl, setLongUrl] = useState("");
  let [links, setLinks] = useState({});

  const onCreate = async (e) => {
    e.preventDefault();

    const result = await axios.post("/api/shorten", { longUrl });
  };

  const getLinks = async () => {
    const response = await axios.get("/api/links");

    return response?.data?.links;
  };

  const refreshLinks = async () => {
    const linkObj = await getLinks();
    setLinks(linkObj);
  };

  useEffect(() => {
    const fetchLink = async () => {
      refreshLinks();
    };

    fetchLink();
  }, []);

  const onShortUrlClick = (short) => {
    const url = `http:localhost:3000/go/${short}`;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log("copied to clipboard");
      },
      () => {
        alert("couldnt copy to clipboard nigga");
      }
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Url shortner</h1>
        <div className="flex flex-col justify-center items-center gap-y-4">
          <h2>Create a short url!</h2>
          <input
            className="bg-white text-gray-700 px-3"
            type="text"
            placeholder="Enter a long url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            className="cursor-pointer bg-white p-2 rounded-3xl text-black"
            onClick={onCreate}
          >
            Make it short
          </button>

          <p>Shortened URLs</p>

          {Object.keys(links).map((short) => {
            const long = links[short];
            return (
              <div key={short} className="flex flex-col items-center">
                <p>Key = {short}</p>
                <p
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => onShortUrlClick(short)}
                >
                  {`http://localhost:3000/go/${short}`}
                </p>
                <p>{long}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
