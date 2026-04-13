import { Contact } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import {
  sendContactEmailToAdmin,
  sendContactConfirmationToUser,
} from './contact.utils';

interface ContactQuery {
  searchTerm?: string;
  orderBy?: string;
  filter?: string;
  page?: string;
  limit?: string;
}

const createContactIntoDB = async (payload: Contact) => {
  const contact = await prisma.contact.create({
    data: payload,
  });

  // Send notification email to admin
  try {
    await sendContactEmailToAdmin({
      name: contact.name,
      email: contact.email,
      message: contact.message || undefined,
      createdAt: contact.createdAt,
    });
  } catch {
    // Log error silently - email failure shouldn't break the contact creation
  }

  // Send confirmation email to user
  try {
    await sendContactConfirmationToUser({
      name: contact.name,
      email: contact.email,
      message: contact.message || undefined,
      createdAt: contact.createdAt,
    });
  } catch {
    // Log error silently - email failure shouldn't break the contact creation
  }

  return contact;
};

const getAllContactsFromDB = async (query: ContactQuery) => {
  const contactQuery = builderQuery({
    searchFields: ['name', 'email', 'message'],
    searchTerm: query.searchTerm,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : { createdAt: 'desc' },
    filter: query.filter ? JSON.parse(query.filter) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [contacts, total] = await prisma.$transaction([
    prisma.contact.findMany({
      where: contactQuery.where,
    }),
    prisma.contact.count({ where: contactQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / contactQuery.take),
    },
    data: contacts,
  };
};

const getContactByIdFromDB = async (id: string) => {
  const contact = await prisma.contact.findUniqueOrThrow({
    where: { id },
  });

  return contact;
};

const updateContactInDB = async (id: string, payload: Partial<Contact>) => {
  await prisma.contact.findUniqueOrThrow({
    where: { id },
  });

  const updatedContact = await prisma.contact.update({
    where: { id },
    data: payload,
  });

  return updatedContact;
};

const deleteContactInDB = async (id: string) => {
  await prisma.contact.findUnique({
    where: { id },
  });

  const deletedContact = await prisma.contact.delete({
    where: { id },
  });

  return deletedContact;
};

export const ContactService = {
  createContactIntoDB,
  getAllContactsFromDB,
  getContactByIdFromDB,
  updateContactInDB,
  deleteContactInDB,
};
