import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";


// import { getStorage ,ref, uploadBytesResumable} from 'firebase/storage';

// import { useState } from "react";
import { storage } from "/firebase";
import Image from "next/image";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Home() {
  const router = useRouter();
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      router.push("/auth/login");
      // setUsername(sessionStorage.getItem("username"))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getDocs(collection(database, "students")).then((response) => {
      setStudentsData(response.docs);
    });
  };

  console.log(studentsData);

  const updateStudent = () => {
    alert("update");
  };

  const deleteStudent = async (id) => {
    let fieldToDelete = doc(database, "students", id);
    await deleteDoc(fieldToDelete)
      .then(() => {
        alert("Data Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    sessionStorage.removeItem("username");
    router.push("/auth/login");
  }; // State to store uploaded file
  // ===================
  // const [file, setFile] = useState(""); // progress
  // const [percent, setPercent] = useState(0); // Handle file upload event and update state
  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }
  // const handleUpload = () => {
  //   if (!file) {
  //     alert("Please upload an image first!");
  //   }
  //   const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       ); // update progress
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //       });
  //     }
  //   );
  // };

// --------------------------------------------------

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="" >

      <div className="ml-64 text-[34px] mb-10"> Start application </div>
<input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
   
      <button onClick={uploadFile} > Upload Image</button>
      <div className="mb-10"></div>
      {imageUrls.map((url) => {
        // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
        return <img src={url}  alt="d" />
      })}








{/* =--------------------- */}


      {/*         <div>    
      <input type="file" onChange={handleChange} accept="/image/*" />
                  <button onClick={handleUpload}>Upload to Firebase</button>
                  <p>{percent} `% done`</p>
              </div>
       */}

      {/* <img src={imageUrl} />

{imageUrl.map((url) => (
    // eslint-disable-next-line react/jsx-key
    <img src={url}/>
))} */}
      


    </div>
  );
}
