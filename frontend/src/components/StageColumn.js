import React from 'react';
import { Card } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const StageColumn = ({ stage, onCardClick, ...props }) => (
    <div className="stage-column">
        <Droppable droppableId={stage.id.toString()}>
            {(provided) => (
                <Card className="mb-4 h-100" ref={provided.innerRef} {...provided.droppableProps} {...props}>
                    <Card.Header className="text-center fw-bold">{stage.title}</Card.Header>
                    <Card.Body className="d-flex flex-column">
                        {stage.candidates.map((candidate, idx) => (
                            <CandidateCard key={candidate.id} candidate={candidate} index={idx} onClick={onCardClick} />
                        ))}
                        {provided.placeholder}
                    </Card.Body>
                </Card>
            )}
        </Droppable>
    </div>
);

export default StageColumn;
