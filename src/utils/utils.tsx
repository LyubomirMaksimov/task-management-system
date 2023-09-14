export const returnStatusName = (ticketStatus: number) => {
  switch (ticketStatus) {
    case 1:
      return "Очаква приемане";

    case 2:
      return "Приет за изпълнение";

    case 3:
      return "Изпълнен - За одобрение";

    case 11:
      return "Приключен тикет";

    case 12:
      return "Прекратен тикет";

    case 13:
      return "Отказан за изпълнение";

    default:
      return "Не беше намерен статус на тикета.";
  }
};
