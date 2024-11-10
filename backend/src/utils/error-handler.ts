import { Response } from "express";
import { TErrorResponse } from "../types/";

interface IHandleErrorFn {
  res: Response;
  error: any;
  customMessage?: string;
}

export const handleError = ({ res, error, customMessage }: IHandleErrorFn) => {
  console.error("Error: ", error);

  const errorResponse: TErrorResponse = {
    status: 500,
    body: {
      data: null,
    },
    success: false,
    message: customMessage || error.message || "Internal Server Error",
  };

  res.status(500).json(errorResponse);
};
