function transactionCreator(task: any) {
  return {
    ...task.formValues,
  };
}
export default transactionCreator;
