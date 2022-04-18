export interface ITask {
    id: string;
    title: string;
    description: string;
    status: ITaskStatus;
}
export declare enum ITaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
