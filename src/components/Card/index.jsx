import React, { useRef, useContext } from "react";
import { Container, Label } from "./styles";
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';


const Card = ({ data, index, listIndex }) => {
    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD',
        item: { type: 'CARD', index, listIndex },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggetIndex = item.index;
            const targetIndex = index;

            if (draggetIndex === targetIndex && draggedListIndex === targetListIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();

            const draggedTop = draggedOffset.y - targetSize.top;


            if(draggetIndex < targetIndex && draggedTop < targetCenter) {
                return;
            }

            if(draggetIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }

            move(draggedListIndex, targetListIndex, draggetIndex, targetIndex);

            item.index = targetIndex;
            item.targetIndex = targetListIndex;
        }
    })

    dragRef(dropRef(ref));

    return(
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels?.map(label => <Label key={label} color={label}/>)}
            </header>
            <p>{data.content}</p>
            { data.user && <img src={data.user} alt="avatar" />}
        </Container>
    )
}


export default Card;