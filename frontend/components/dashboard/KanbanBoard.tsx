"use client";

import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Building2 } from 'lucide-react';
import { CollegeCard } from '@/components/college/CollegeCard';

type College = any; // Using any for simplicity in mock

interface ColumnType {
  id: string;
  title: string;
}

const COLUMNS: ColumnType[] = [
  { id: 'dream', title: 'Dream' },
  { id: 'target', title: 'Target' },
  { id: 'safety', title: 'Safety' },
  { id: 'applied', title: 'Applied' }
];

interface SortableItemProps {
  id: string;
  college: College;
}

function SortableCollegeItem({ id, college }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative z-10 group">
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-3 right-3 p-1.5 rounded-md glass-panel opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20"
      >
        <GripVertical size={14} className="text-on-surface-variant" />
      </div>
      <div className="pointer-events-none">
        {/* We wrap in pointer-events-none to let dnd-kit handle drag properly without child interference, except the drag handle if needed. But for simple usage, we make the whole card draggable. Actually, since CollegeCard has links, making the whole card draggable intercepts clicks. So we rely on the drag handle. */}
        {/* Wait, if pointer-events-none is on, links inside CollegeCard won't work. Let's fix that. */}
      </div>
      <div className="rounded-[1.5rem] overflow-hidden glass-card p-1 shadow-sm transition-all hover:shadow-[0_0_15px_rgba(78,222,163,0.1)]">
        <div className="flex items-center gap-3 p-3 border-b border-white/5">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-bg-surface ring-1 ring-white/10 flex items-center justify-center">
            <span className="font-bold text-text-muted text-[10px] uppercase bg-white/[0.02] w-full h-full flex items-center justify-center">
              {college.abbreviation || college.name.substring(0,3)}
            </span>
          </div>
          <div>
            <h4 className="font-body-md font-semibold text-on-surface line-clamp-1 text-[13px]">{college.name}</h4>
            <p className="font-body-md text-[10px] text-on-surface-variant mt-0.5">{college.city}, {college.state}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KanbanBoard({ initialColleges }: { initialColleges: College[] }) {
  // Map colleges to columns. Let's just put them in 'target' initially if not set.
  const [items, setItems] = useState<Record<string, College[]>>({
    dream: [initialColleges[0]].filter(Boolean),
    target: [initialColleges[1]].filter(Boolean),
    safety: [initialColleges[2]].filter(Boolean),
    applied: []
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find(key => items[key].some(item => item.id === id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string) || over.id as string;

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      // Cross-container move handled in dragOver if implemented, but simple version:
      if (activeContainer && overContainer && activeContainer !== overContainer) {
        setItems(prev => {
          const activeItems = [...prev[activeContainer]];
          const overItems = [...prev[overContainer]];
          const activeIndex = activeItems.findIndex(i => i.id === active.id);
          
          const [moved] = activeItems.splice(activeIndex, 1);
          overItems.push(moved);
          
          return {
            ...prev,
            [activeContainer]: activeItems,
            [overContainer]: overItems
          };
        });
      }
    } else {
      // Same container reorder
      setItems(prev => {
        const containerItems = [...prev[activeContainer]];
        const oldIndex = containerItems.findIndex(i => i.id === active.id);
        const newIndex = containerItems.findIndex(i => i.id === over.id);
        
        if (oldIndex !== newIndex) {
          return {
            ...prev,
            [activeContainer]: arrayMove(containerItems, oldIndex, newIndex)
          };
        }
        return prev;
      });
    }

    setActiveId(null);
  };

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-headline-md text-[24px] text-on-surface">Application Pipeline</h2>
        <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Drag to move</span>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map(column => (
            <div key={column.id} className="glass-card rounded-[2rem] p-4 bg-bg-surface/30 flex flex-col h-full min-h-[300px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface font-bold">{column.title}</h3>
                <span className="bg-white/10 text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {items[column.id].length}
                </span>
              </div>
              
              <div className="flex-1">
                <SortableContext id={column.id} items={items[column.id].map(c => c.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3 min-h-[200px]">
                    {items[column.id].map(college => (
                      <SortableCollegeItem key={college.id} id={college.id} college={college} />
                    ))}
                    {items[column.id].length === 0 && (
                      <div className="h-full min-h-[100px] border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center text-on-surface-variant/50 font-label-caps text-[10px] uppercase tracking-widest">
                        Drop here
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
