function taskCreator(task: any) {
  return {
    customerId: task.customerId,
    // formValues: {
    //   customerId: task.customerId,
    //   amount: '',
    //   transactionType: '',
    // },
    name: task.accountName,
    location: task.permanentTole,
    mobileNumber: task.mailMobileNumber,
    businessType: task.occupation,
    taskStatus: false,
  };
}
export default taskCreator;
