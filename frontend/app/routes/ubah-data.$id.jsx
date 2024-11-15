import React, { useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect } from "react";

export default function UbahData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const { id, user, API_LINK } = useLoaderData();
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setGender(user.gender);
  }, [user]);

  console.log(id);

  function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();

    axios
      .patch(`${API_LINK}/users/${id}`, { name, email, gender })
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          console.log("Delete success!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>ubah-data</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukan Nama..."
          value={name}
          required
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukan Email..."
          value={email}
          required
        />
        <input
          type="text"
          onChange={(e) => setGender(e.target.value)}
          placeholder="Masukan Gender..."
          value={gender}
          required
        />
        <button type="submit">Simpan</button>
      </form>
    </>
  );
}

export async function loader({ params }) {
  const res = await fetch(`${process.env.API_LINK}/users/${params.id}`);
  const user = await res.json();

  return {
    id: params.id,
    user,
    msg: "Data ditemukan",
    API_LINK: process.env.API_LINK,
  };
}

// export async function loader() {
//     const res = await fetch("http://localhost:5000/users/${params.id}");
//     return json(await res.json());
//   }
