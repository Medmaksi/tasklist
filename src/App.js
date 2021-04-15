import React, {useState, useEffect} from "react";
import Item from "./components/Item";
import './App.css';
import Modal from "./components/Modal";
const axios = require('axios');

function App() {
  const [state, dispatch] = useState({
    currentPage: 1,
    perPage: 10
  });

  const [sortAsc, setSortAsc] = useState('');
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const pageNumbers = [];
  const lastIndex = state.currentPage * state.perPage;
  const firstIndex = lastIndex - state.perPage;

  for(let i = 1; i<=Math.ceil(list.length / state.perPage); i++){
    pageNumbers.push(i);
  }

  const handleClick = (page) => {
    dispatch({
      currentPage: Number(page),
      perPage: 10
    })
  }

  const sort = () => {
    sortAsc === '' || sortAsc === 'asc' ? setSortAsc('desc') : setSortAsc('asc')
  }

  useEffect(() => {
    axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(function (response) {
          setList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []);

  useEffect(() => {
    if(sortAsc === 'asc') {
      list.sort(function(a, b) {
        return (
            a.completed-b.completed
        )
      })
    } else if(sortAsc=== 'desc') {
      list.sort(function(a, b) {
        return (
            a.completed - b.completed
        )
      }).reverse()
    }
  }, [sortAsc]);
  return (
    <div className="App" style={show ? {height:'100vh', width: '100vw', overflow: 'hidden'} : null}>
      <header className="App-header">
        <div className="col" style={{flex: 'none'}}>#</div>
        <div className="col">Title</div>
        <div className="col">Assignee</div>
        <div className="col" onClick={sort} style={{cursor: 'pointer'}}>
          Status
          <span> {sortAsc==='asc' ? '↑' : '↓'} </span>
        </div>
        <div className="col">Actions</div>
      </header>
      {list.slice(firstIndex, lastIndex).map((listItem) => (
         <Item toggle={setShow} removeItem={setList} totalList={list} itemSelect={setSelected} selected={selected} props={listItem} key={listItem.id}/>
      ))}
      <div id="page-numbers">
        <li id="prev" onClick={() => handleClick(state.currentPage!==1 ? state.currentPage-1 : 1)}>Prev</li>
        {pageNumbers.map((page) => (
            <li onClick={() => handleClick(page)} key={page} id={page}>{page}</li>
        ))}
        <li id="next" onClick={() => handleClick(state.currentPage!== Math.ceil(list.length / state.perPage)  ? state.currentPage+1 : Math.ceil(list.length / state.perPage))}>Next</li>
      </div>
      <div style={show ? {display: 'block'} : {display: 'none'}} className="cover">
        <Modal selected={selected} changeSelected={setSelected} toggle={setShow} show={show}/>
      </div>
    </div>
  );
}

export default App;
