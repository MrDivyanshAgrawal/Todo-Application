'use client';
import { useState,useEffect} from "react";

export default function Home() {
  const [todos,setTodos]=useState([]);
  const [inputValue,setInputValue]=useState('');

useEffect(()=>{
  const savedTodos=localStorage.getItem('todos');
  if(savedTodos){
    setTodos(JSON.parse(savedTodos));
  }
},[]);

useEffect(()=>{
  localStorage.setItem('todos',JSON.stringify(todos));
},[todos]);

const addTodo=()=>{
    if(inputValue.trim()===''){
      alert('Please enter a todo');
      return ;
    }

    const newTodo={
      id:Date.now(),
      text:inputValue,
      completed:false,
    };

    setTodos([...todos,newTodo]);
    setInputValue('');
};

const deleteTodo=(id)=>{
  const newTodos=todos.filter(todo=>todo.id!==id)
  setTodos(newTodos);
};

const toggleComplete=(id)=>{
  const newTodos=todos.map(todo=>{
    if(todo.id===id){
      return {...todo,completed:!todo.completed};
    }else{
      const clickedTodoWillBeCompleted=!todos.find(t=>t.id===id)?.completed;
      if(clickedTodoWillBeCompleted){
        return {...todo,completed:false};
      }
      return todo;
    }
  });
  setTodos(newTodos);
};

const totalCount = todos.length;
const completedCount = todos.filter(todo => todo.completed).length;
const pendingCount = totalCount - completedCount;

return (
  <div className="min-h-screen flex item-center justify-center p-8">
    <div className="w-full max-w-2xl space-y-8">
    <h1 className="text-5xl font-bold text-indigo-900 text-center">
        Todo Application
    </h1>

    <div className="flex gap-4 justify-center">
      <div className="bg-white p-5 rounded-xl text-center shadow-md min-w-[120px] hover:shadow-lg transition-shadow">
        <p className="text-gray-600 text-sm front-semibold">Total</p>
        <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
      </div>
      <div className="bg-emerald-50 p-5 rounded-xl text-center shadow-md min-w-[120px] hover:shadow-lg transition-shadow">
        <p className="text-emerald-700 text-sm front-semibold">Completed</p>
        <p className="text-3xl font-bold text-emerald-900">{completedCount}</p>
      </div>
      <div className="bg-amber-50 p-5 rounded-xl text-center shadow-md min-w-[120px] hover:shadow-lg transition-shadow">
        <p className="text-amber-600 text-sm front-semibold">Pending</p>
        <p className="text-3xl font-bold text-amber-900">{pendingCount}</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex gap-3">
      <input 
      type="text"
      value={inputValue}
      onChange={(e)=>setInputValue(e.target.value)}
      onKeyPress={(e)=>e.key==='Enter' && addTodo()}
      placeholder="What needs to be done?"
      className="flex-1 px-4 py-3 border-2 border-indigo-200 rounded-lg text-gray-800 bg-gray-50 focus:border-indigo-400 focus:outline-none focus:bg-white transition-all text-base" 
      />
      <button 
      onClick={addTodo}
      className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md hover:shadow-lg" >
        Add Todo
      </button>
      </div>
    </div>

    <div className="space-y-8">
      {todos.length===0?(
        <div className="bg-white p-12 rounded-xl text-center shadow-md">
          <p className="text-gray-600 text-lg">No todos yet.Add one Above!</p>
        </div>
      ):(
        todos.map(todo => (
            <div key={todo.id} className="bg-white p-5 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow">
              <input 
              type="checkbox"
              checked={todo.completed}
              onChange={()=>toggleComplete(todo.id)}
              className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
              <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.text}
              </span>
              <span className="text-xs text-gray-500 bg-indigo-50 px-2 py-1 rounded">
                ID:{todo.id}
              </span>
              <button 
              onClick={()=>deleteTodo(todo.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors font-medium"
              >
              Delete
              </button>
            </div>
        ))  
      )}
    </div>

    {todos.length>0 && (
      <p className="text-center text-sm mt-6">
        Note: Only one todo can be completed at a time
      </p>
    )}
    </div>
  </div>
  );
}