import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [requestConfig, setRequestConfig] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIyNDMyNjUyOTB9.IQ9py2fYA1E0PKcKfedfYxNOFdLPAnVycqXrY1MT6ks"; // Tokenni shu yerda belgilashingiz mumkin

  // POST, DELETE uchun config sozlash
  const postGetData = (payload = null) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (method === "POST") {
      setRequestConfig({
        ...config,
        method: "POST",
        body: JSON.stringify(payload), // payload faqat POST uchun
      });
    } else if (method === "DELETE") {
      setRequestConfig({ ...config, method: "DELETE" });
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsPending(true);
      try {
        const config = {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            ...(method !== "GET" && { "Content-Type": "application/json" }), // GETda Content-Type kerak emas
          },
          ...(requestConfig && { body: requestConfig.body }), // body faqat POST va DELETE uchun
        };

        const req = await fetch(url, config);
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const resData = await req.json();
        setData(resData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setIsPending(false);
      }
    };

    // GET so'rov yoki requestConfig bo'lsa chaqiriladi
    if (method === "GET" || requestConfig) {
      getData();
    }
  }, [url, method, requestConfig]); // url, method yoki requestConfig o'zgarganda qayta ishlaydi

  return { data, isPending, error, postGetData };
};
