import { useState, useEffect } from "react"
import api from "../api"
import House from "../components/House";

function Home (){
    const [houses, setHouse] = useState([]);
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(()=> {
        getHouses();
    }, [])

    const getHouses = () => {
        api
        .get("/api/houses/")
        .then((res) => res.data)
        .then((data)=> {setHouse(data); console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteHouse = (id) => {
        api
            .delete(`/api/houses/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Data deleted!");
                else alert("Failed to delete data.");
                getHouses();
            })
            .catch((error) => alert(error));
    };

    const createHouse = (e) => {
        e.preventDefault();
        api
            .post("/api/houses/", { image, content, title })
            .then((res) => {
                if (res.status === 201) alert("Data added!");
                else alert("Failed to add data.");
                getHouses();
            })
            .catch((err) => alert(err));
    };

    


    return (
    <div>
        <div>
            <h2>Houses</h2>
            {houses.map((house) => (
                <House house={house} onDelete={deleteHouse} key={house.id} />
            ))}
        </div>
        <h2>Upload new data</h2>
        <form onSubmit={createHouse}>
            <label htmlFor="image">Image:</label>
            <input
                type="text"
                id="image"
                name="image"
                required
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />
            <br/>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <br/>
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    );
}

export default Home