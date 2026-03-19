export interface Steps {
    id: number;
    title: string;
    isCompleted?: boolean;
}

interface BaseTask {
    id: string;
    title: string;
    isImportant?: boolean;
    isCompleted?: boolean;
    note?: string;
    steps?: Steps[];
    taskList?: string;
}

// task received from server
export interface ServerTask extends BaseTask {
    dueDate?: string; // ISO String from JSON.stringify
}

// task in Redux Store
export interface Task extends BaseTask {
    dueDate?: number; // Unix Timestamp !!!
}
export type NewTask = Omit<Task, 'id'>;
export type TaskUpdate = Partial<NewTask>;
export interface TaskUpdateArgs {
    id: string;
    modifiedData: TaskUpdate;
}