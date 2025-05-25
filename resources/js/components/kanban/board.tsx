import { closestCorners, DndContext, DragOverlay, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from 'react';

const initialData = {
    todo: [
        { id: '1', title: 'Write docs' },
        { id: '2', title: 'Fix bug' },
    ],
    'in-progress': [{ id: '3', title: 'Design UI' }],
    done: [{ id: '4', title: 'Completed task' }],
    berting: [],
};

const initialColumnNames = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    done: 'Done',
    berting: 'Basura',
};

export default function Kanban() {
    const [columns, setColumns] = useState(initialData);
    const [activeId, setActiveId] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [viewMode, setViewMode] = useState('horizontal');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [columnOrder, setColumnOrder] = useState(Object.keys(initialData));
    const [columnNames, setColumnNames] = useState(initialColumnNames);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    );

    const findContainer = (id) => {
        if (!id) return null;
        if (columns[id]) {
            return id;
        }
        return Object.keys(columns).find((key) => columns[key].some((item) => item.id === id)) || null;
    };

    const getActiveItem = () => {
        if (!activeId) return null;

        if (activeType === 'Column') {
            return { id: activeId, title: columnNames[activeId] || activeId };
        }

        for (const columnId of Object.keys(columns)) {
            const card = columns[columnId].find((item) => item.id === activeId);
            if (card) return card;
        }
        return null;
    };

    const handleColumnNameChange = (columnId, newName) => {
        setColumnNames((prev) => ({
            ...prev,
            [columnId]: newName,
        }));
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);
        setActiveType(active.data.current?.type || 'Card');
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (!activeContainer || !overContainer) {
            return;
        }

        if (activeContainer === overContainer) {
            return;
        }

        setColumns((prev) => {
            const activeItems = prev[activeContainer] || [];
            const overItems = prev[overContainer] || [];
            const activeIndex = activeItems.findIndex((item) => item.id === active.id);

            if (activeIndex === -1) return prev;

            const activeItem = activeItems[activeIndex];
            if (!activeItem) return prev;

            return {
                ...prev,
                [activeContainer]: activeItems.filter((item) => item.id !== active.id),
                [overContainer]: [...overItems, activeItem],
            };
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            setActiveType(null);
            return;
        }

        if (active.data.current?.type === 'Column' && over.data.current?.type === 'Column') {
            const activeIndex = columnOrder.indexOf(active.id);
            const overIndex = columnOrder.indexOf(over.id);

            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
                setColumnOrder(arrayMove(columnOrder, activeIndex, overIndex));
            }

            setActiveId(null);
            setActiveType(null);
            return;
        }

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (!activeContainer || !overContainer) {
            setActiveId(null);
            setActiveType(null);
            return;
        }

        if (activeContainer === overContainer) {
            const activeIndex = columns[activeContainer]?.findIndex((item) => item.id === active.id) ?? -1;
            const overIndex = columns[overContainer]?.findIndex((item) => item.id === over.id) ?? -1;

            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
                setColumns((prev) => ({
                    ...prev,
                    [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
                }));
            }
        }

        setActiveId(null);
        setActiveType(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <span className="text-sm font-medium text-gray-700">
                                {viewMode === 'horizontal' ? 'Horizontal View' : 'Vertical View'}
                            </span>
                            <svg
                                className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                                <button
                                    onClick={() => {
                                        setViewMode('horizontal');
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
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
                                    className={`w-full rounded-b-lg px-4 py-2 text-left text-sm hover:bg-gray-50 ${
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
                measuring={{
                    droppable: {
                        strategy: 'always',
                    },
                }}
            >
                <SortableContext
                    items={columnOrder}
                    strategy={viewMode === 'horizontal' ? horizontalListSortingStrategy : verticalListSortingStrategy}
                >
                    <div className={`p-6 ${viewMode === 'horizontal' ? 'flex gap-6 overflow-x-auto' : 'mx-auto w-full max-w-4xl space-y-6'}`}>
                        {columnOrder.map((columnId) => (
                            <Column
                                key={columnId}
                                id={columnId}
                                title={columnNames[columnId]}
                                cards={columns[columnId] || []}
                                viewMode={viewMode}
                                onNameChange={(newName) => handleColumnNameChange(columnId, newName)}
                            />
                        ))}
                    </div>
                </SortableContext>

                <DragOverlay adjustScale={false}>
                    {activeId && activeType === 'Card' ? (
                        <Card id={activeId} title={getActiveItem()?.title || ''} isDragOverlay viewMode={viewMode} />
                    ) : activeId && activeType === 'Column' ? (
                        <div className={`${viewMode === 'horizontal' ? 'w-72' : 'w-full max-w-4xl'} flex-shrink-0 opacity-80`}>
                            <div className="flex h-full flex-col rounded-lg border-2 border-blue-400 bg-white shadow-lg">
                                <div className="border-b border-gray-100 bg-blue-50 p-4">
                                    <h2 className="font-semibold text-gray-800">{columnNames[activeId] || activeId}</h2>
                                    <div className="mt-1 text-sm text-gray-500">{(columns[activeId] || []).length} items</div>
                                </div>
                                <div className="bg-opacity-50 min-h-[200px] flex-grow bg-blue-50 p-4">
                                    <div className={`space-y-3 ${viewMode === 'horizontal' ? '' : 'grid grid-cols-4'} `}>
                                        {(columns[activeId] || []).map((card) => (
                                            <div key={card.id} className="rounded-lg border border-gray-200 bg-white p-4">
                                                <div className="text-sm leading-relaxed font-medium text-gray-800">{card.title}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {dropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />}
        </div>
    );
}

function Column({ id, title, cards, viewMode, onNameChange }) {
    const {
        attributes,
        listeners,
        setNodeRef: setSortableNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: {
            type: 'Column',
        },
    });

    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id,
        data: {
            type: 'Column',
            accepts: ['Card'],
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const inputRef = useRef(null);

    const setNodeRef = (node) => {
        setSortableNodeRef(node);
        setDroppableNodeRef(node);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        if (editedTitle.trim() !== title) {
            onNameChange(editedTitle.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className={`${viewMode === 'vertical' ? 'w-full' : 'w-72 flex-shrink-0'}`}>
            <div
                className={`flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 ${
                    isOver ? 'shadow-md ring-2 ring-blue-500' : ''
                } ${isDragging ? 'shadow-lg' : ''}`}
            >
                <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                value={editedTitle}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                onKeyDown={handleKeyDown}
                                className="w-full rounded bg-gray-100 px-2 py-1 font-semibold text-gray-800"
                            />
                        ) : (
                            <h2 className="cursor-text rounded px-2 py-1 font-semibold text-gray-800 hover:bg-gray-100" onClick={handleTitleClick}>
                                {title}
                            </h2>
                        )}
                        <div className="cursor-grab p-2 active:cursor-grabbing" {...listeners}>
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{cards.length} items</div>
                </div>

                <div
                    className={`relative min-h-[200px] flex-grow p-4 transition-colors ${isOver ? 'bg-blue-100' : ''}`}
                    style={{
                        transition: 'background-color 0.15s ease-in-out',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {viewMode === 'horizontal' ? (
                        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-3">
                                {cards.map((card) => (
                                    <Card key={card.id} id={card.id} title={card.title} viewMode={viewMode} />
                                ))}
                            </div>
                        </SortableContext>
                    ) : (
                        <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-5 gap-3">
                                {cards.map((card) => (
                                    <Card key={card.id} id={card.id} title={card.title} viewMode={viewMode} />
                                ))}
                            </div>
                        </SortableContext>
                    )}

                    {cards.length === 0 && (
                        <div
                            className={`grid place-items-center border-2 border-dashed ${
                                isOver ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
                            } h-full min-h-[150px] rounded-lg text-sm text-gray-400`}
                        >
                            Drop cards here
                        </div>
                    )}

                    {isOver && cards.length > 0 && (
                        <div
                            className={`${viewMode === 'vertical' ? 'absolute inset-0 z-10 flex items-center justify-center' : 'mt-3'} bg-opacity-70 pointer-events-none rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 p-2 text-center text-sm text-blue-500`}
                        >
                            Drop here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Card({ id, title, isDragOverlay = false, viewMode = 'horizontal' }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        data: {
            type: 'Card',
        },
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
            className={`cursor-grab rounded-lg border border-gray-200 bg-white p-4 transition-all duration-150 hover:border-gray-300 hover:shadow-sm active:cursor-grabbing ${isDragging ? 'opacity-70 shadow-lg' : ''} ${isDragOverlay ? 'cursor-grabbing border-2 border-blue-400 shadow-xl' : ''} ${viewMode === 'vertical' ? 'flex aspect-square items-center justify-center text-center' : ''} `}
        >
            <div className={`text-sm leading-relaxed font-medium text-gray-800 ${viewMode === 'vertical' ? 'text-center break-words' : ''}`}>
                {title}
            </div>
        </div>
    );
}
