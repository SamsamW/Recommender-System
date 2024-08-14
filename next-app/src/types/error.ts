import {StatusCodes} from "http-status-codes";

export interface ErrorResponse {
    timestamp: Date,
    status: StatusCodes,
    error: string,
    message: string,
}