function taskCreator(task: any) {
  return {
    customerId: task.customerId,
    // formValues: {
    //   customerId: task.customerId,
    //   amount: '',
    //   transactionType: '',
    // },
    name: task.name,
    location: task.location,
    mobileNumber: task.mobileNumber,
    businessType: task.businessType,
    taskStatus: false,
  };
}
export default taskCreator;
