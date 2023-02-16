// import axios from "axios";

// // function for downloading video
// const downloadVideo = () => {
//   axios
//     .get(`/download/${id}`, {
//       responseType: "blob",
//     })
//     .then((res) => {
//       // A blob is an object that stores the type of a file, and the size of the file in bytes. URL.createObjectURL creates a new URL from the blob
//       const url = URL.createObjectURL(new Blob([res.data]));

//       // Create an 'a' in the html and click it
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${id}.mp4`);
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch((err) => console.error(err));
// };

// export { downloadVideo };
