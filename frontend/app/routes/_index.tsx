import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useRevalidator  } from "@remix-run/react";
import { Link } from "@remix-run/react";
import axios from "axios";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type datatype = {
  _id: string;
  name: string;
  email: string;
  gender: string;
};

type api_type = {
  API_LINK : string
}

type typeCast = {
  data : datatype[],
  API_LINK : api_type
}

export default function Index() {
  const {data} = useLoaderData() as typeCast;
  console.log(data);

  const revalidator = useRevalidator();

  const { API_LINK } = useLoaderData() as typeCast;
    console.log(API_LINK);

  function handleDelete(id: string) {
    console.log("handleDelete");

    axios
      .delete(`${API_LINK}/users/${id}`)
      .then((res) => {
        console.log(res);
        if(res.statusText === "OK"){
          console.log("Delete success!");
          revalidator.revalidate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Link to="/tambah-data"><button>TAMBAH</button></Link>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>
                  <a href={`ubah-data/${data._id}`}>
                    <button>Edit</button>
                  </a>
                  <button onClick={() => handleDelete(data._id)}>Hapus</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export async function loader() {
  // const res = await fetch(`http://localhost:5000/users`);
  const res = await fetch(`${process.env.API_LINK}/users`);
  const data = await res.json()
  return {data, API_LINK: process.env.API_LINK};
}
