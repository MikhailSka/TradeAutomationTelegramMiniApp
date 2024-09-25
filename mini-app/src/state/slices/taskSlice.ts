import { StateCreator } from 'zustand';
import { Task } from '../../models/Task';

export interface TaskState {
  tasks: Task[];
  markTaskComplete: (id: number) => void;
  addTask: (task: Task) => void;
}

export const createTaskSlice: StateCreator<any, [], [], TaskState> = (set, get) => ({
  tasks: [
    { id: 1, title: 'Follow us on Twitter', points: 50, isComplete: false, platform: 'Twitter' },
    { id: 2, title: 'Watch our YouTube video', points: 100, isComplete: false, platform: 'YouTube' },
  ],

  markTaskComplete: (id: number) => {
    const tasks = get().tasks.map((task: Task) =>
      task.id === id ? { ...task, isComplete: true } : task
    );
    const completedTask = get().tasks.find((task: Task) => task.id === id && !task.isComplete);
    if (completedTask) {
      get().addPoints(completedTask.points);
    }
    set({ tasks });
  },

  addTask: (task: Task) => set((state: TaskState) => ({ tasks: [...state.tasks, task] })),
});
