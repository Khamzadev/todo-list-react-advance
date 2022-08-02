import Main from "./Main/Main";
import {useState} from "react";
import './style.css'

function App() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Пойти гулять",
            isActive: true,
            isDone: false,
            isImportant: true,
            time: 20.00
        },
        {
            id: 2,
            title: "Пойти дышать",
            isActive: true,
            isDone: true,
            isImportant: false,
            time: 20.00
        }

    ]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');



    const addTask = (e) =>{
        setTasks(
        [...tasks, {
                    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                    title: e.target[0].value,
                    isActive: true,
                    isDone: false,
                    isImportant: false,
                    time: 20.00
                }]
        );  e.target[0].value = ''
    };

    const deleteTask = (idx) =>{
        setTasks( tasks.filter(item =>{ return  item.id !== idx}))
    };
    const doneHandler = (idx) =>{
        setTasks(tasks.map(item =>{
             if (item.id === idx){
                 return {...item, isDone: !item.isDone}
             } else {
                 return item
             }
        }))
    };
    const deleteAllDone = () =>{
        setTasks( tasks.filter(item =>{ return !item.isDone}))
    };
    const importantHandler = (idx) =>{
        setTasks(tasks.map(item =>{
            if (item.id === idx){
                return {...item, isImportant: !item.isImportant}
            } else {
                return item
            }
        }))
    };
    const changeStatus = (newStatus) =>{

    };


  return (
    <div className={"App"}>
        <div className={"todo__content"}>
            <h1 className={"title"}>Todo-List</h1>
            <h3 className={"todo__count"}>
                {tasks.length} tasks and to done {tasks.filter(item => item.isDone).length}
            </h3>
            <form className={"form"} onSubmit={(e) => {
                e.preventDefault();
                e.target[0].value.trim().length > 0 && addTask(e);
            }}>
                <input className={"form__input"} placeholder="add tasks" type="text"/>
                <button className={"form__btn"} type={"submit"}>create</button>
            </form>
            <ul className={"list"}> {
                !tasks.length ?
                    <h2>Ваш список дел пуст</h2> :

                    // tasks.filter(item => item.isDone).length === 0 && status === 'done' ? <h2>Ваш список выполненных задач пуст !!</h2> :
                    // tasks.filter(item => item.isImportant).length === 0 && status === 'important' ? <h2>Ваш список выжных задач пуст !!</h2> :
                !tasks.filter(item =>  item.title.toLowerCase().startsWith(search.toLowerCase())).length && status === 'done' ?
                    <h2>По вашему запросу готовых дел нет</h2> :

                    !tasks.filter(item =>  item.title.toLowerCase().startsWith(search.toLowerCase())).length && status === 'important' ?
                        <h2>По вашему запросу важных дел нет</h2> :

                        !tasks.filter(item =>  item.title.toLowerCase().startsWith(search.toLowerCase())).length && status === 'all' ?
                    <h2>По вашему запросу дел нет</h2> :

                    tasks.filter(item => item.isDone).length === 0 && status === 'done' ? <h2>Ваш список выполненных задач пуст !!</h2> :
                    tasks.filter(item => item.isImportant).length === 0 && status === 'important' ? <h2>Ваш список выжных задач пуст !!</h2> :

                tasks.filter(item =>{
                    if (status === 'important')
                        return item.isImportant;
                    if (status === 'done')
                        return item.isDone;

                    return item
                }).filter(item => {
                        return item.title.toLowerCase().startsWith(search.toLowerCase())
                    }).map(item =>(
                    <li  className="todo__item" key={item.id}>
                        <p className="title" style={{color: item.isImportant ? 'red' : '' , textDecoration: item.isDone ? 'line-through' : ''}}>{item.title}</p>

                        <div className="item__btns">
                            <button className={"item__btn"} onClick={() => doneHandler(item.id)} style={{ background: item.isDone ? 'limegreen' : '' }}>Done</button>
                            <button className={'item__btn'} onClick={() => importantHandler(item.id)} style={{background: item.isImportant ? 'gold' : '' }}>important</button>
                            <button type={"button"} onClick={() => deleteTask(item.id)} style={{background: 'silver'}} className="item__btn">
                                <img src="https://img.icons8.com/external-ios-line-2px-amoghdesign/21/000000/external-delete-multimedia-line-30px-ios-line-2px-amoghdesign.png"/>
                            </button>
                        </div>
                    </li>
                ))
            }


            </ul>
            <input className={"search"} type="search" placeholder={"enter task"}  value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="tasks__bottom">
                {/*{ !tasks.length ? <span>tasks count </span> : ''}*/}
                {
                    tasks.length && <button className={"todo__btn"} onClick={deleteAllDone}>Delete all done</button> || ''
                }
                <div className="tasks__btns">
                    <button className={"todo__btn"} onClick={() => setStatus('all')} style={{background: status === 'all' ? 'greenyellow' : '' }}>All</button>
                    <button className={"todo__btn"} onClick={() => setStatus('important')} style={{background: status === 'important' ? 'greenyellow' : '' }}>Important</button>
                    <button className={"todo__btn"} onClick={() => setStatus('done')} style={{background: status === 'done' ? 'greenyellow' : '' }}>Done</button>
                </div>
            </div>
        </div>
    </div>
  );
}



// del btn
export default App;
