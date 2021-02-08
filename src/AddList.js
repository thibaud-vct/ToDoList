import List from "./List";
import { useState } from "react";
import uid2 from "../node_modules/uid2";

const AddList = ({ handleOpen, timerDblClick }) => {
    const [lists, setLists] = useState([]);
    const [name, setNameList] = useState("");
    const [helpButton, setHelpButton] = useState(false);
    // Dégrader de couleur des listes
    let bgcLine = (i) => {
        let g = 70 + i * 5;
        return `rgb(193, ${g}, 49)`;
    };

    // Fonction pour créer une list
    const handleSubmit = (e) => {
        e.preventDefault();
        // création d'un ID unique
        const id = uid2(5);
        const newPropsList = { id: id };
        // création de la list
        newPropsList.value = name;
        const newList = [...lists];
        newList.push(newPropsList);
        setLists(newList);
        setNameList("");
    };

    // Fonction pour supprimer une liste
    const handleDelete = (e) => {
        timerDblClick.blockDblClick = true;
        clearTimeout(timerDblClick.timerClick);
        const id = e.target.id;
        const newList = [...lists];
        const index = newList.findIndex((elem) => elem.id === id);
        newList.splice(index, 1);
        setLists(newList);
    };

    return (
        <div className="container">
            <main>
                {lists.map(({ id, value, open }, i) => {
                    return (
                        <List
                            memo={value}
                            key={id}
                            id={id}
                            handleOpen={handleOpen}
                            handleDelete={handleDelete}
                            rgb={bgcLine(i)}
                        />
                    );
                })}
            </main>
            <footer>
                {helpButton && (
                    <div className="notice">
                        <span>NOTICE</span>
                        <span>open simple click</span>

                        <span>delete double click </span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="add new list"
                            onChange={(e) => {
                                setNameList(e.target.value);
                            }}
                            value={name}
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
export default AddList;
