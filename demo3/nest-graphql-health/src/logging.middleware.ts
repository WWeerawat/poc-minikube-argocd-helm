import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const podName = process.env.POD_NAME || 'unknown-pod';
    res.setHeader('X-Pod-Name', podName);
    console.log(`Pod ${podName} received a request`);
    next();
  }
}
