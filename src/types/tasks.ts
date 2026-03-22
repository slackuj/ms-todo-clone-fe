export interface Step {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface BaseTask {
    id: string;
    title: string;
    isImportant: boolean;
    isCompleted: boolean;
    note?: string;
    steps?: Step[];
    taskList?: string;
}

// task received from server
export interface ServerTask extends BaseTask {
    dueDate: string | null; // ISO String from JSON.stringify
}

// task in Redux Store
export interface Task extends BaseTask {
    dueDate: number | null; // Unix Timestamp !!!
}
export type NewTask = Omit<Task, 'id'>;
export type TaskUpdate = Partial<NewTask>;
export interface TaskUpdateArgs {
    id: string;
    modifiedData: TaskUpdate;
}