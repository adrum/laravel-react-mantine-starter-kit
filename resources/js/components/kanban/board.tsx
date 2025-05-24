import React, { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

const initialData = {
  'todo': [
    { id: '1', title: 'Write docs' },
    { id: '2', title: 'Fix bug' },
  ],
  'in-progress': [
    { id: '3', title: 'Design UI' },
  ],
  'done': [],
};

const columnNames = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const findColumnByCardId = (cardId) => {
    return Object.keys(columns).find((col) =>
      columns[col].some((c) => c.id === cardId)
    );
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveCard(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = findColumnByCardId(active.id);
    if (!sourceCol) return;

    // Check if dropping directly onto a column
    if (over.id in columns) {
      // Dropping onto a column directly
      const destCol = over.id;
      const card = columns[sourceCol].find((c) => c.id === active.id);
      
      setColumns((prev) => {
        const newSource = prev[sourceCol].filter((c) => c.id !== active.id);
        const newDest = [...prev[destCol], card]; // Add to the end of the column
        
        return {
          ...prev,
          [sourceCol]: newSource,
          [destCol]: newDest,
        };
      });
    } else {
      // Dropping onto another card
      const destCol = findColumnByCardId(over.id);
      if (!destCol) return;

      if (sourceCol === destCol) {
        // Same column reordering
        const oldIndex = columns[sourceCol].findIndex((c) => c.id === active.id);
        const newIndex = columns[destCol].findIndex((c) => c.id === over.id);

        setColumns((prev) => ({
          ...prev,
          [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
        }));
      } else {
        // Moving between columns
        const card = columns[sourceCol].find((c) => c.id === active.id);
        setColumns((prev) => {
          const newSource = prev[sourceCol].filter((c) => c.id !== active.id);
          const newDest = [
            ...prev[destCol].slice(
              0,
              prev[destCol].findIndex((c) => c.id === over.id)
            ),
            card,
            ...prev[destCol].slice(
              prev[destCol].findIndex((c) => c.id === over.id)
            ),
          ];
          return {
            ...prev,
            [sourceCol]: newSource,
            [destCol]: newDest,
          };
        });
      }
    }

    setActiveCard(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            id={columnId}
            title={columnNames[columnId]}
            cards={columns[columnId]}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeCard ? (
          <div 
            style={{
              padding: '8px',
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow: '0 5px 10px rgba(0,0,0,0.15)',
              width: '240px',
              opacity: 0.8,
            }}
          >
            {columns[findColumnByCardId(activeCard)]?.find(card => card.id === activeCard)?.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function Column({ id, title, cards }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef} 
      className="w-64 bg-gray-100 rounded p-4 min-h-[200px]"
      data-column-id={id}
    >
      <h2 className="font-bold mb-4">{title}</h2>
      <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <SortableCard key={card.id} id={card.id} title={card.title} />
        ))}
      </SortableContext>
    </div>
  );
}

function SortableCard({ id, title }) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
}

