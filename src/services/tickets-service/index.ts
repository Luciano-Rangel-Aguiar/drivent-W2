import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketRepository.findTicketByEnrolment(enrollment.id);

  if(!enrollment) {
    throw notFoundError();
  }

  if(!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function getTicketTypes() {
  const ticketTypes =  await ticketRepository.findTicketTypes();
  
  if(!ticketTypes) { throw notFoundError(); }

  return ticketTypes;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrolment(enrollment.id);

  return ticket;
}

const ticketService = { getTicketByUserId, getTicketTypes, createTicket };
export default ticketService;
