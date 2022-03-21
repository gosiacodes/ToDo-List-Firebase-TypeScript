import { onValue, ref, update, push } from "firebase/database";
import { db } from "./modules/firebaseApp";
import { Task } from "./modules/classTask";

console.log(db);
const dbRef = ref(db, '/my_todos');
let tasks:Task[] = [];

onValue(dbRef, snapshot => {
    const toDoData = snapshot.val();
    console.log('todo Data:');
    console.log(toDoData);
 
    // Remove each task from DOM
    for(const task of tasks){
        task.clearTask();
    }
    tasks = [];

    for(const key in toDoData){
        // console.log(key);
        tasks.push(new Task(
            key,
            toDoData[key].task,
            toDoData[key].done
        ));
    }
    console.log(tasks);
})

const addTaskBtn = document.querySelector("#add-task-btn");

addTaskBtn.addEventListener('click', e => {
    const taskInput:HTMLInputElement = document.querySelector("#input-task");
    e.preventDefault();

    const taskToAdd = {
        task: taskInput.value,
        done: false
    }

    taskInput.value = '';

    const newKey:string = push(dbRef).key;
    const newTask = {};
    newTask[newKey] = taskToAdd;
    
    update(dbRef, newTask);

})