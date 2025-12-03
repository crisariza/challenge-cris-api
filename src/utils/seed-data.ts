import User from "../models/user";
import Card from "../models/card";
import Transaction from "../models/transaction";

export const seedMockData = async (): Promise<void> => {
  try {
    const existingUser = await User.findOne({
      where: { email: "soypaisanx@paisanos.io" },
    });

    if (existingUser) {
      console.log("Mock data already exists, skipping");
      return;
    }

    console.log("Seeding mock data");

    const user = await User.create({
      email: "soypaisanx@paisanos.io",
      password: "PAISANX2023!$",
      username: "Paisanx User",
    });

    console.log("User created:", user.email);

    const cards = await Card.bulkCreate([
      {
        userId: user.id,
        issuer: "Visa",
        name: "Paisabank Visa Classic",
        expDate: "12/2025",
        lastDigits: 4532,
        balance: "1250.50",
        currency: "USD",
      },
      {
        userId: user.id,
        issuer: "Mastercard",
        name: "Paisabank Mastercard Gold",
        expDate: "06/2026",
        lastDigits: 5678,
        balance: "3500.00",
        currency: "USD",
      },
      {
        userId: user.id,
        issuer: "Visa",
        name: "Paisabank Visa Platinum",
        expDate: "09/2027",
        lastDigits: 9012,
        balance: "875.25",
        currency: "USD",
      },
    ]);

    console.log(`Created ${cards.length} cards`);

    const transactions = await Transaction.bulkCreate([
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Adobe",
        amount: "125.00",
        transactionType: "SUS",
        date: new Date("2024-01-15T10:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Camila Montenegro",
        amount: "95.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-14T15:45:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Figma",
        amount: "125.00",
        transactionType: "SUS",
        date: new Date("2024-01-13T08:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Leonardo Echazu",
        amount: "95.00",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-12T11:20:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Martin Bozzini",
        amount: "95.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-11T14:15:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Leonardo Echazu",
        amount: "95.00",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-11T14:15:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Transferencia recibida",
        amount: "500.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-15T10:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Compra en supermercado",
        amount: "125.50",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-14T15:45:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Suscripción Netflix",
        amount: "15.99",
        transactionType: "SUS",
        date: new Date("2024-01-13T08:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Depósito en efectivo",
        amount: "1000.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-12T11:20:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Pago de servicios",
        amount: "85.75",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-11T14:15:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Suscripción Spotify",
        amount: "9.99",
        transactionType: "SUS",
        date: new Date("2024-01-10T09:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Transferencia enviada",
        amount: "250.00",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-09T16:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Suscripción Amazon Prime",
        amount: "12.99",
        transactionType: "SUS",
        date: new Date("2024-01-08T07:15:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Salario recibido",
        amount: "3500.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-07T10:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Compra en farmacia",
        amount: "45.80",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-06T13:20:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Suscripción Disney+",
        amount: "8.99",
        transactionType: "SUS",
        date: new Date("2024-01-05T08:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Reembolso de compra",
        amount: "89.50",
        transactionType: "CASH_IN",
        date: new Date("2024-01-04T11:45:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Pago de tarjeta de crédito",
        amount: "1200.00",
        transactionType: "CASH_OUT",
        date: new Date("2024-01-03T14:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Suscripción HBO Max",
        amount: "14.99",
        transactionType: "SUS",
        date: new Date("2024-01-02T09:15:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Transferencia recibida de amigo",
        amount: "75.00",
        transactionType: "CASH_IN",
        date: new Date("2024-01-01T12:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Compra en restaurante",
        amount: "65.25",
        transactionType: "CASH_OUT",
        date: new Date("2023-12-31T20:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Suscripción Apple Music",
        amount: "10.99",
        transactionType: "SUS",
        date: new Date("2023-12-30T07:45:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Depósito de nómina",
        amount: "2800.00",
        transactionType: "CASH_IN",
        date: new Date("2023-12-29T09:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Pago de alquiler",
        amount: "850.00",
        transactionType: "CASH_OUT",
        date: new Date("2023-12-28T10:30:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Suscripción YouTube Premium",
        amount: "11.99",
        transactionType: "SUS",
        date: new Date("2023-12-27T08:20:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Bonificación recibida",
        amount: "200.00",
        transactionType: "CASH_IN",
        date: new Date("2023-12-26T15:10:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[0].id,
        title: "Compra en gasolinera",
        amount: "55.00",
        transactionType: "CASH_OUT",
        date: new Date("2023-12-25T11:40:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Suscripción Microsoft 365",
        amount: "6.99",
        transactionType: "SUS",
        date: new Date("2023-12-24T07:00:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[1].id,
        title: "Transferencia recibida",
        amount: "150.00",
        transactionType: "CASH_IN",
        date: new Date("2023-12-23T13:25:00Z"),
      },
      {
        userId: user.id,
        cardId: cards[2].id,
        title: "Pago de factura de luz",
        amount: "95.50",
        transactionType: "CASH_OUT",
        date: new Date("2023-12-22T16:15:00Z"),
      },
    ]);

    console.log(`Created ${transactions.length} transactions`);
    console.log("Mock data seeded successfully!");
  } catch (error) {
    console.error("Error seeding mock data:", error);
    throw error;
  }
};
