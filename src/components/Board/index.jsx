import { Container } from "./styles";

import List from '../List';

import { loadLists } from '../../services/api';

const lists = loadLists();


const Board = () => {
    return(
        <Container>
            {lists?.map(list => <List key={list.tile} data={list}/>)}
        </Container>
    )
}


export default Board;