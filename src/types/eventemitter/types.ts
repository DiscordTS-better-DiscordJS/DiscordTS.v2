export type Callback = (...args: any[]) => any | Promise<any>;
export type Listener = Callback & { __once__? :true };
export type EventName =
    'message' | 'ready'