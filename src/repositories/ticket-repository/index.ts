import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findTicketByEnrolment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId, 
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketTypes() {
  return prisma.ticketType.findMany();  
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });  
}

async function findTicketWithTypeById(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true
    }
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

export type createTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

async function createTicket(ticket: createTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    }
  });
}

const ticketRepository = { findTicketByEnrolment, findTicketTypes, findTicketById, createTicket, findTicketWithTypeById, ticketProcessPayment };

export default ticketRepository;
