import React, {useState, useEffect} from "react";
import '../style/Modal.css';
const axios = require('axios');

const Modal = ({show, selected, toggle, changeSelected}) => {

    const [value, setValue] = useState(selected.title);
    const [complete, setComplete] = useState(selected.completed);

    useEffect(() => {
        setComplete(selected.completed);
    }, [selected.completed]);

    useEffect(() => {
        setValue(selected.title);
    }, [selected.title]);


    const save = (id, complete, value) => {
       axios
            .patch(`https://jsonplaceholder.typicode.com/todos/:${id}`,{
                'title' : value,
                'completed' : complete
            }).then(function (response) {
                changeSelected({...selected, title: response.data.title, completed: response.data.completed});
                toggle(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    if(!show) {
        return null;
    } else {
        return(
               <div className="modalContainer">
                   <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
                   <label>
                       Complete:
                       <input type="checkbox" name="name" onChange={() => setComplete(!complete)} checked={complete}/>
                   </label>
                <div className="buttonContainer">
                    <button onClick={() => save(selected.id, complete, value)}>Save</button>
                    <button onClick={() => toggle(false)}>Cancel</button>
                </div>
               </div>
        )
    }
}

export default Modal;