import React, {useState, useEffect} from "react";
const axios = require('axios');

const Item = ({props, toggle, itemSelect, selected, removeItem, totalList}) => {
    const [users, setUsers] = useState([]);
    console.log(selected);
    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const deleteItem = (itemId) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/:${itemId}`)
            .then(function (response) {
               const filteredAry = totalList.filter(e => e.id !== itemId)
               removeItem(filteredAry);
        })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }
        return(
            <div className="row" style={{padding: '1em'}}>
                <div className="col" style={{flex: 'none'}}>{props.id}</div>
                <div className="col">{selected.id===props.id ? selected.title : props.title}</div>
                <div className="col">{users.length!==0 ? users.find(user => user.id===props.userId).name : null}</div>
                <div className="col">{(selected.id=== props.id ? selected.completed===true ? 'Done' : 'In progress' : props.completed===true ? 'Done' : 'In progress' )}</div>
                <div className="col">
                    <button onClick={() => {
                        toggle(true);
                        !selected.length ? itemSelect(props) : itemSelect(selected);
                    }}>Edit</button>
                    <button onClick={() => deleteItem(props.id)}>Delete</button>
                </div>
            </div>
        )
}

export default Item;