/* Your Code Here */
class EmployeeRecordClass {
  constructor(firstName, familyName, title, payPerHour) {
    this.firstName = firstName;
    this.familyName = familyName;
    this.title = title;
    this.payPerHour = payPerHour;
    this.timeInEvents = [];
    this.timeOutEvents = [];
  }
}

function createEmployeeRecord(array) {
  const employee = new EmployeeRecordClass(array[0], array[1], array[2], array[3]);
  return employee;
}

function createEmployeeRecords(array) {
  let employeeRecordsArray = [];
  for (let record of array) {
    employeeRecordsArray.push(createEmployeeRecord(record));
  }
  return employeeRecordsArray;
}

function createTimeInEvent(timeStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0]
  })
  return this;
}

function createTimeOutEvent(timeStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0]
  })
  return this;
}

function hoursWorkedOnDate(date) {
  let totalHours = 0;
  let timeIn;
  let timeOut;
  
  let len = this.timeInEvents.length;
  for (let i = 0; i < len; ++i) {
  // for (timeInPunch of employee.timeInEvents) {
    if (date === this.timeInEvents[i].date) {
      // since we know that there is always a corresponding time-out punch,
      // we're going to pull in the time out punch in the exact same spot
      // on the timeOutEvents array.
      timeIn = this.timeInEvents[i].hour;
      timeOut = this.timeOutEvents[i].hour;
      totalHours = (timeOut - timeIn) / 100;

      // We can also simplify this to one line, but that makes it a bit more
      // convoluted
      // totalHours = employee.timeOutEvents[i].time - employee.timeInEvents[i].time
    }
  }

  return totalHours;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeesArray) {
  let totalSum = 0;

  for (let employee of employeesArray) {
    totalSum += allWagesFor.call(employee);
  }

  return totalSum;
}

function findEmployeeByFirstName(srcArray, firstName) {
  let len = srcArray.length;

  for (let i = 0; i < len; ++i) {
    if (srcArray[i].firstName === firstName) {
      return srcArray[i]
    }
  }

  return undefined;
}
