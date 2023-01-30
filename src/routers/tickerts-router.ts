import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket } from "@/controllers/tickets-controler";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketTypes)
  .post("/", createTicket);

export { ticketsRouter };
