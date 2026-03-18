export interface Steps {
    id: number;
    title: string;
    isCompleted?: boolean;
}

export interface Task {
    id: string;
    title: string;
    dueDate?: Date;
    reminder?: Date;
    isImportant?: boolean;
    isCompleted?: boolean;
    note?: string;
    steps?: Steps[];
    taskList?: string;
}

export type NewTask = Omit<Task, 'id'>;
export type TaskUpdate = Partial<NewTask>;
export interface TaskUpdateArgs {
    id: string;
    modifiedData: TaskUpdate;
}