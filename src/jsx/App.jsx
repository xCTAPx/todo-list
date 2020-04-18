import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import Task from './Task.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], render: false };
        this.inpRef = React.createRef();
        this.editRef = React.createRef();
        this.addTask = this.addTask.bind(this);
        this.deleteF = this.deleteF.bind(this);
        this.changesHandle = this.changesHandle.bind(this);
        this.enterAddWord = this.enterAddWord.bind(this);
        this.readyF = this.readyF.bind(this);
    }

    componentDidMount() {
        let taskList = JSON.parse(localStorage.getItem('taskList'));
        if (taskList) {
            this.setState({ tasks: taskList });
        }

        document.addEventListener("keypress", this.enterAddWord);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.enterAddWord);
    }

    enterAddWord(e) {
        if (e.key === "Enter") {
            this.addTask();
        }
    }

    readyF(index) {
        this.state.tasks[index].ready = true;
        this.setState({ render: !this.state.render });
        localStorage.setItem('taskList', JSON.stringify(this.state.tasks));
    }

    addTask() {
        const tasks = this.state.tasks;
        if (this.inpRef.current.value) {
            let newTask = { id: +new Date(), text: this.inpRef.current.value, edit: false, ready: false };
            this.setState({ tasks: [...tasks, newTask] });
            this.inpRef.current.value = "";
            localStorage.setItem('taskList', JSON.stringify(this.state.tasks));
        } else {
            alert("Enter valid task, please");
        }
    }

    deleteF(index) {
        let safedTasks = this.state.tasks.filter(task => task.id !== index);
        this.setState({ tasks: safedTasks });
        localStorage.setItem('taskList', JSON.stringify(safedTasks));
    }

    changesHandle(index) {
        this.state.tasks[index].text = this.editRef.current.value;
        this.setState({ render: !this.state.render })
    }

    render() {
        return (<div>
            <div className="newTaskInput">
                <input type="text" ref={this.inpRef} />
                <button onClick={this.addTask}>ADD TASK</button>
            </div>
            {this.state.tasks.map((task, index) => <Task task={task.text}
                readyF={() => this.readyF(index)}
                ready={task.ready}
                edited={task.edit}
                key={task.id}
                delete={() => this.deleteF(task.id)}
                edit={() => this.editF(task.id)}
                ref={this.editRef}
                changesHandle={() => this.changesHandle(index)} />)}
        </div>)
    }
}

ReactDOM.render(<App />, document.getElementById("root"));