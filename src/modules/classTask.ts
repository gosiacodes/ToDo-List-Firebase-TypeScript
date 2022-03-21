import { db } from "./firebaseApp";
import {  ref, remove, update } from "firebase/database";

class Task {
    constructor (
        public readonly id:string,
        public readonly task:string,
        public done:boolean
    ){
        this.displayTasks();
    }

    private displayTasks():void{
        const tasksDiv:HTMLElement = document.querySelector("#tasks-div");
        const h3:HTMLHeadingElement = document.createElement('h3');
        const delButton:HTMLButtonElement = document.createElement('button');
        const taskContainer:HTMLElement = document.createElement('div');

        h3.innerText = this.task;
        delButton.innerText = 'X';
        delButton.className = 'delete-btn';
        taskContainer.className = 'task-container';
        taskContainer.id = this.id;
        if(this.done) h3.style.textDecorationLine = "line-through";

        h3.addEventListener('click', () => {
            console.log('h3 clicked');
            this.toggleDone();
        })

        delButton.addEventListener('click', () => {
            console.log('delete btn clicked');
            const taskRef = ref(db, '/my_todos/' + this.id);
            remove(taskRef);
        })

        taskContainer.append(h3);
        taskContainer.append(delButton);
        tasksDiv.append(taskContainer);
        document.body.append(tasksDiv);

    }  

    private toggleDone():void{
        this.done = !this.done;
        
        const taskRef = ref(db, '/my_todos/' + this.id);
        const updates = {};
        updates['/done'] = this.done;
        update(taskRef, updates);
    }

    public clearTask():void{
        document.querySelector(`#${this.id}`).remove();
    }
}

export { Task }