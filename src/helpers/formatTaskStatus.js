export default function formatTaskStatus(status) {
  switch (status) {
    case 'DRAFT':
      return 'Черновик';
    case 'IN_PROCESS':
      return 'В работе';
    case 'COMPLETED':
      return 'Завершена';
    case 'TESTING':
      return 'Тестирование';
    case 'TESTING_DONE':
      return 'Выполнена';
    case 'CLOSED':
      return 'Закрыта';
    case 'DELETED':
      return 'Удалена';
  }
}
