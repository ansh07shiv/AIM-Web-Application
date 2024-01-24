export const CompareWithTodayIsLate = (deadlineDate) => {

    if(deadlineDate && deadlineDate.length > 0) {

        var dateComponents = deadlineDate.split('/');

        let month = parseInt(dateComponents[0], 10);
        let day = parseInt(dateComponents[1], 10);
        let year = parseInt(dateComponents[2], 10);
        deadlineDate = new Date(year, month - 1, day);

        // Get Today's Date

        let todayDate = new Date();

        month = todayDate.getMonth() + 1; // Months are zero-based
        day = todayDate.getDate();
        year = todayDate.getFullYear();
        todayDate = new Date(year, month - 1, day); // Months are zero-based

        console.log(deadlineDate);
        console.log(todayDate);

        return deadlineDate < todayDate;
    } else {
        return false;
    }
}