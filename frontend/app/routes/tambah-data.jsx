import React, { useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";

export default function tambahData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const { API_LINK } = useLoaderData();
  console.log(API_LINK);

  function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();

    

    axios
      .post(`${API_LINK}/users`, { name, email, gender })
      .then((res) => {
        console.log(res);
        if (res.statusText === "Created") {
          console.log("Insert success!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>tambah-data</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukan Nama..."
          required
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukan Email..."
          required
        />
        <input
          type="text"
          onChange={(e) => setGender(e.target.value)}
          placeholder="Masukan Gender..."
          required
        />
        <button type="submit">Simpan</button>
      </form>
    </>
  );
}

export function loader() {
  return { API_LINK: process.env.API_LINK };
}
