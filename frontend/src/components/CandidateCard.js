import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

const CandidateCard = ({ candidate, index, onClick }) => (
    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
        {(provided) => (
            <Card
                className="mb-2 candidate-card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => onClick(candidate)}
                data-testid="candidate-card"
            >
                <Card.Body className="p-3">
                    <Card.Title className="text-center mb-2">{candidate.name}</Card.Title>
                    {candidate.rating > 0 && (
                        <div className="rating-dots">
                            {Array.from({ length: candidate.rating }).map((_, i) => (
                                <span key={i} role="img" aria-label="rating">🟢</span>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        )}
    </Draggable>
);

export default CandidateCard;
