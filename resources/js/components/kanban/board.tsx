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
  rectSortingStrategy,
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
  'done': [
    { id: '4', title: 'Completed task' },
  ],
  'berting': [],
};

const columnNames = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
  'berting': 'Basura',
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialData);
  const [activeId, setActiveId] = useState(null);
  const [viewMode, setViewMode] = useState('horizontal');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const findContainer = (id) => {
    if (id in columns) {
      return id;
    }
    return Object.keys(columns).find((key) =>
      columns[key].some((item) => item.id === id)
    );
  };

  const getActiveCard = () => {
    if (!activeId) return null;
    for (const columnId of Object.keys(columns)) {
      const card = columns[columnId].find(item => item.id === activeId);
      if (card) return card;
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex(item => item.id === active.id);
      const activeItem = activeItems[activeIndex];

      return {
        ...prev,
        [activeContainer]: activeItems.filter(item => item.id !== active.id),
        [overContainer]: [...overItems, activeItem],
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer === overContainer && viewMode === 'horizontal') {
      const activeIndex = columns[activeContainer].findIndex(item => item.id === active.id);
      const overIndex = columns[overContainer].findIndex(item => item.id === over.id);

      if (activeIndex !== overIndex) {
        setColumns((prev) => ({
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        }));
      }
    }

    setActiveId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="text-sm font-medium text-gray-700">
                {viewMode === 'horizontal' ? 'Horizontal View' : 'Vertical View'}
              </span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setViewMode('horizontal');
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    viewMode === 'horizontal' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  Horizontal View
                </button>
                <button
                  onClick={() => {
                    setViewMode('vertical');
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-b-lg ${
                    viewMode === 'vertical' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  Vertical View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={`p-6 ${viewMode === 'horizontal' ? 'flex gap-6 overflow-x-auto' : 'space-y-6'}`}>
          {Object.keys(columns).map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={columnNames[columnId]}
              cards={columns[columnId]}
              viewMode={viewMode}
            />
          ))}
        </div>
        <DragOverlay adjustScale={false}>
          {activeId ? (
            <Card
              id={activeId}
              title={getActiveCard()?.title || ''}
              isDragOverlay
              viewMode={viewMode}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}

function Column({ id, title, cards, viewMode }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'Column',
      accepts: ['Card'],
    }
  });

  return (
    <div className={`${viewMode === 'vertical' ? 'h-[400px] w-full' : 'w-72 flex-shrink-0'}`}>
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 h-full flex flex-col ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
      }`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <div className="text-sm text-gray-500 mt-1">{cards.length} items</div>
        </div>

        <div
          ref={setNodeRef}
          className={`p-4 transition-colors flex-grow min-h-[200px] ${
            isOver ? 'bg-blue-50' : ''
          }`}
        >
          {viewMode === 'horizontal' ? (
            <SortableContext
              items={cards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </SortableContext>
          ) : (
            <SortableContext
              items={cards.map((card) => card.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-5 gap-3">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </SortableContext>
          )}

          {(cards.length === 0 || isOver) && (
            <div className={`grid place-items-center border-2 border-dashed ${
              isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            } rounded-lg text-gray-400 text-sm h-full min-h-[150px]`}>
              Drop cards here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ id, title, isDragOverlay = false, viewMode = 'horizontal' }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'Card',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-4 bg-white rounded-lg border border-gray-200 cursor-grab
        hover:shadow-sm hover:border-gray-300
        active:cursor-grabbing transition-all duration-150
        ${isDragging ? 'shadow-lg opacity-70' : ''}
        ${isDragOverlay ? 'shadow-xl border-2 border-blue-400 cursor-grabbing' : ''}
        ${viewMode === 'vertical' ? 'aspect-square flex items-center justify-center text-center' : ''}
      `}
    >
      <div className={`text-sm font-medium text-gray-800 leading-relaxed ${
        viewMode === 'vertical' ? 'text-center break-words' : ''
      }`}>
        {title}
      </div>
    </div>
  );
}
