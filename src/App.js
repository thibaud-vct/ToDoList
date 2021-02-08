import "./App.css";
import { useState } from "react";
import Memo from "./Memo";
import Header from "./Header";
import AddList from "./AddList";

function App() {
    const [memo, setMemo] = useState([]);
    // Gestion des clicks
    const timerDblClick = { timerClick: Function, blockDblClick: Boolean };
    // Fonction pour ouvrir la liste
    const handleOpen = (e) => {
        timerDblClick.blockDblClick = false;
        timerDblClick.timerClick = setTimeout(() => {
            if (!timerDblClick.blockDblClick) {
                // identifier la list
                console.log(e.target.id);
                // création de la list
                const newPropsList = { id: e.target.id };
                const newMemo = [...memo];
                newMemo.push(newPropsList);
                setMemo(newMemo);
                console.log(memo);
            }
        }, 250);
    };
    return (
        <div className="App">
            <Header />
            {/* <AddList handleOpen={handleOpen} timerDblClick={timerDblClick} /> */}
            <Memo />
        </div>
    );
}

export default App;
