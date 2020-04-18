import React, {useState} from 'react';

const Task = React.forwardRef((props, ref) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.task);

    const InputTxt = () => {
        return edit ? <input type="text" value={value} autoFocus className="taskTextInp" onChange={e => setValue(e.target.value)} ref={ref} /> 
                            : <input type="text" value={props.task} readOnly className="taskTextInp"/>
    }

    const Icons = () => {
        return edit ? <span className="icons">
                        <i className="fas fa-check-square okIcon" onClick={saveChanges}></i>
                    </span> : 
                    <span className="icons">
                        <i className="fas fa-check-square okIcon" onClick={props.readyF}></i>
                        <i className="fas fa-trash-alt deleteIcon" onClick={props.delete}></i>
                        <i className="fas fa-edit editIcon" onClick={() => setEdit(true)}></i>
                     </span>
    }

    function saveChanges() {
        setEdit(false);
        props.changesHandle();
    }

    if(props.ready) {
        return (<div className="taskBlock ready">
                <p className="taskText">
                    <InputTxt />
                    <span className="icons">
                        <i className="fas fa-trash-alt deleteIcon" onClick={props.delete}></i>
                     </span>
                </p>
            </div>)
    } else {
        return (<div className="taskBlock">
                <p className="taskText">
                    <InputTxt />
                    <Icons />
                </p>
            </div>)
    }
});

export default Task;