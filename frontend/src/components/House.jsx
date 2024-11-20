import React from "react";

function House({house, onDelete}){
    const formattedDate = new Date(house.created_at).toLocaleDateString("en-US")

    return(
        <div>
            <img src={house.image}/>
            <p>{house.title}</p>
            <p>{house.content}</p>
            <p>{formattedDate}</p>
            <button onClick={()=>onDelete(house.id)}>Delete</button>
        </div>
    );
}

export default House;