import { initialState } from "../data/initialState";
import { useReducer, useState } from 'react';

function reducer (state, action){
    //switch cases

    switch (action.type) {

        // ADD TO DO
        case "ADD_TODO":
            
            return [{
                userId: 1,
                id: Date.now(),
                title: action.payload,
                complete: false
            },
            ...state,
        ];

        // DELETE TO DO
        case "DELETE_TODO":
            return state.filter(todos => todos.id !== action.payload );
        
        case "TOGGLE_TODO":
            return state.map(
                todo => todo.id === action.payload ? {...todo, complete: !todo.complete} :todo
            )

        case "EDIT_TODO": 
                return state.map( todo => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo )
    
           default: return state;
    }
}


function ToDoList(){

    const [ todos, dispatch ] = useReducer(reducer, initialState);
    const [ newTodo, setNewTodo  ] = useState("");
    const [ editMode, setEditMode ] = useState("");
    const [ editedTodo, setEditedTodo ] = useState("");

    const handleAddTodo = () => {

        if(newTodo.trim() !== ""){
            dispatch({ type: "ADD_TODO", payload: newTodo});
            setNewTodo("") 
        }
    }

    const handleDeleteTodo = (id) => {
        dispatch({ type:"DELETE_TODO", payload: id })
    }

    const handleToggle =(id) => {

        dispatch({ type:"TOGGLE_TODO", payload: id })
    }

    const handleEditMode = (id) => {
        setEditMode(id);
        const todoToEdit = todos.find(todo => todo.id === id);
        setEditedTodo (todoToEdit.title)
    }

    const handleSaveEdit = (id) => {
        dispatch({ type: "EDIT_TODO", payload: {id: id, title: editedTodo} })
        setEditMode("");
    }




    const listItems = todos.map((item) =>  
     <div key={ item.id }  className="checkbox-container" >
        {/* EDITED TO DO */}

        { editMode === item.id ? 
        (
            <input 
                type="text"
                value={editedTodo }
                onChange={(e) => setEditedTodo(e.target.value)}            
            />

        ) : ( 

            <>
            {/* CheckBox OG */}
        <input
        type="checkbox"
        name="item"
        value={ item.title } 
        checked={ item.complete }
        onChange={() => handleToggle(item.id)}
        />
        
        <label> {item.title} </label>
            
            </>
        )}
        
        {/* Hide Buttons when in edit Mode */}
        {editMode !== item.id && (
            <>
                <button onClick={ () => handleEditMode(item.id) } > Edit </button>
            
                <button 
                    onClick={ () => handleDeleteTodo(item.id)}
                    disabled={ !item.complete }
                    > Delete </button>
            </>

        )}

        {editMode === item.id && (
            <button onClick={ () => handleSaveEdit(item.id) } >Save</button>
        )}
                



        <br></br>
        <br></br>

     </div>
        
         )



    return (
        <div> 
            
        <input 
        type="text"
        value={newTodo || ''} 
        onChange={(e) => setNewTodo(e.target.value) }  
        placeholder='Add Task'
        />
        <button onClick={handleAddTodo} > Add </button> 

    <ul> { listItems } </ul>

        </div>
         
    )
} 

export default ToDoList;