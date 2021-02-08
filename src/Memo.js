import Task from "./Task";
import { useState } from "react";
import uid2 from "uid2";

const Memo = () => {
    const [memos, setMemos] = useState([]);
    const [task, setTask] = useState("");
    const [helpButton, setHelpButton] = useState(false);
    // const [bgcLine, setBgcLine] = useState(25);
    let bgcLine = (i) => {
        return `rgb(193, ${70 + i * 5}, 49)`;
    };
    // Fonction pour créer une tache
    const handleSubmit = (e) => {
        e.preventDefault();
        // création d'un ID unique
        const id = uid2(5);
        const newTask = { id: id };
        newTask.value = task;
        const newMemo = [...memos];
        // vérifie si il y a des taches validées pour ajouter la tache au dessus
        const indexTaskIsValid = newMemo.findIndex(
            (elem) => elem.valid === true
        );
        if (indexTaskIsValid === -1) {
            newMemo.push(newTask);
        } else {
            newMemo.splice(indexTaskIsValid, 0, newTask);
        }
        setMemos(newMemo);
        setTask("");
    };
    // Gestion des clicks
    const timerDblClick = { timerClick: Function, blockDblClick: Boolean };
    // Fonction pour valider une tache
    const handleValide = (e) => {
        timerDblClick.blockDblClick = false;
        timerDblClick.timerClick = setTimeout(() => {
            if (!timerDblClick.blockDblClick) {
                const id = e.target.id;
                const newMemo = [...memos];
                // on recherche index de l'Obj avec id dans le tableau
                const index = newMemo.findIndex((elem) => elem.id === id);
                // on ajoute son index à l'Obj
                if (newMemo[index].index === undefined) {
                    // console.log(newMemo[index].index);
                    newMemo[index].index = index;
                }
                // on récupère l'Obj du tableau pour le déplacer à la fin du tableau si il est barré sinon on le remet à sa place
                const taskIsValid = newMemo.splice(index, 1);
                const line = e.target.style;
                if (line.textDecorationLine === "line-through") {
                    taskIsValid[0].valid = false;
                    // vérifie si il y a des taches validées pour ajouter la tache au dessus
                    const indexTaskIsValid = newMemo.findIndex(
                        (elem) => elem.valid === true
                    );
                    if (indexTaskIsValid === -1) {
                        newMemo.splice(taskIsValid[0].index, 0, taskIsValid[0]);
                    } else {
                        newMemo.splice(indexTaskIsValid, 0, taskIsValid[0]);
                    }
                    setMemos(newMemo);
                    line.textDecorationLine = "";
                } else {
                    taskIsValid[0].valid = true;
                    newMemo.push(taskIsValid[0]);
                    setMemos(newMemo);
                    line.textDecorationLine = "line-through";
                }
            }
        }, 250);
    };
    // Fonction pour supprimer une tache
    const handleDelete = (e) => {
        timerDblClick.blockDblClick = true;
        clearTimeout(timerDblClick.timerClick);
        const id = e.target.id;
        const newMemo = [...memos];
        const index = newMemo.findIndex((elem) => elem.id === id);
        newMemo.splice(index, 1);
        setMemos(newMemo);
    };

    return (
        <div className="container">
            <main>
                {memos.map(({ id, value, valid }, i) => {
                    return (
                        <Task
                            memo={value}
                            key={id}
                            id={id}
                            handleValide={handleValide}
                            handleDelete={handleDelete}
                            rgb={!valid ? bgcLine(i) : "rgb(150, 115, 90)"}
                        />
                    );
                })}
            </main>
            <footer>
                {helpButton && (
                    <div className="notice">
                        <span>NOTICE</span>
                        <span>valid simple click</span>
                        <span>delete double click </span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="add new task"
                            onChange={(e) => {
                                setTask(e.target.value);
                            }}
                            value={task}
                        />
                    </div>
                </form>
                <button
                    onClick={() => {
                        setHelpButton(helpButton ? false : true);
                    }}
                >
                    help
                </button>
            </footer>
        </div>
    );
};
export default Memo;
