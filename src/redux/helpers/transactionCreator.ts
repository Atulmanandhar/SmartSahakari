export const incompletedTasksFiller = (customerId: any) => {
  return {
    customerId,
    transactionType: 'DEPOSIT',
    amount: '0',
  };
};

function transactionCreator(task: any) {
  return {
    ...task.formValues,
  };
}

export default transactionCreator;
