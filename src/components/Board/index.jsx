import { Container } from "./styles";
import BoardContext from "./context";

import { produce } from 'immer';

import List from '../List';

import { loadLists } from '../../services/api';
import { useState } from "react";

const data = loadLists();

const Board = () => {
    const [lists, setLists] = useState(data)

    function move(fromList, from, to) {
        console.log(from, to)
        setLists(produce(lists, draft => {
            const dragged = draft[fromList].cards[from];

            draft[fromList].cards.splice(from, 1);
            draft[fromList].cards.splice(to, 0, dragged);
        }))
    }

    return (
        <BoardContext.Provider value={{ lists, move }}>
            <Container>
                {lists?.map((list, index) => <List key={list.tile} index={index} data={list} />)}
            </Container>
        </BoardContext.Provider>
    )
}


export default Board;