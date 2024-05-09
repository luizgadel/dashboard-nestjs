import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import { RouteInfo } from '@nestjs/common/interfaces';
import { request } from 'http';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const getResponseLog = (res: Response) => {
            const rawResponse = res.write;
            const rawResponseEnd = res.end;
            const chunkBuffers = [];

            res.write = (...chunks) => {
                const resArgs = [];
                for (let i = 0; i < chunks.length; i++) {
                    resArgs[i] = chunks[i];
                    if (!resArgs[i]) {
                        res.once('drain', res.write);
                        i--;
                    }
                }

                if (resArgs[0]) {
                    chunkBuffers.push(Buffer.from(resArgs[0]));
                }

                return rawResponse.apply(res, resArgs);
            };

            res.end = (...chunk) => {
                const resArgs = [];
                for (let i = 0; i < chunk.length; i++) {
                    resArgs[i] = chunk[i];
                }

                if (resArgs[0]) {
                    chunkBuffers.push(Buffer.from(resArgs[0]));
                }
                
                const body = Buffer.concat(chunkBuffers).toString('utf8');
                res.setHeader('origin', 'restjs-req-res-logging-repo');
                const responseLog = {
                    response: {
                        statusCode: res.statusCode,
                        body: (body != '' ? JSON.parse(body) : (body || {})),
                        // Returns a shallow copy of the current outgoing headers
                        headers: res.getHeaders(),
                    },
                };
                rawResponseEnd.apply(res, resArgs);
                if (body != '') console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`);
                return responseLog as unknown as Response;
            };
        };
            

        // Gets the request log
        getResponseLog(res);

        // Ends middleware function execution, hence allowing to move on 
        if (next) {
            next();
        }
    }
}
