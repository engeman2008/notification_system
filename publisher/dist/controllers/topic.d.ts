import { NextFunction, Request, Response } from 'express';
declare class TopicController {
    private database;
    constructor();
    private doesTopicExists;
    subscribe: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    publish: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
export default TopicController;
