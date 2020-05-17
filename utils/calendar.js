
'use strict';

const timeZoneOffset = '-03:00';

const currentlyOpen = () => {
    let date = new Date();
    date.setHours(date.getHours() + parseInt(timeZoneOffset.split(':')[0]));
    date.setMinutes(date.getMinutes() + parseInt(timeZoneOffset.split(':')[0][0] + timeZoneOffset.split(':')[1]));

    return date.getDay() >= 1 &&
      date.getDay() <= 5 &&
      date.getHours() >= 8 &&
      date.getHours() <= 18;
};

var startDate = new Date(),
    endDate = new Date();

var rootStart = startDate,
    rootEnd = endDate;

var interval = 2, // how big single slot should be (in this case 2 hrs) 
    freeSlots = []; 

function slotsFromEvents(date, events) {

    events.forEach(function (event, index) { //calculate free from busy times
        if (index == 0 && startDate < event.start) {
            freeSlots.push({startDate: startDate, endDate: event.start});
        }
        else if (index == 0) {
            startDate = event.end;
        }
        else if (events[index - 1].end < event.start) {
            freeSlots.push({startDate: events[index - 1].end, endDate: event.start});
        }

        if (events.length == (index + 1) && event.end < endDate) {
            freeSlots.push({startDate: event.end, endDate: endDate});
        }
    });


    if (events.length == 0) {
        freeSlots.push({startDate: startDate, endDate: endDate});
    }

    var temp = {}, hourSlots = [];
    freeSlots.forEach(function(free, index) {
        var freeHours = new Date(free.endDate).getHours() - new Date(free.startDate).getHours(), freeStart = new Date(free.startDate), freeEnd = new Date(free.endDate);
        while(freeStart.getHours()+freeHours+interval>=0) { // 11 + 4 + 2 >= 0
            if(freeHours>=interval) {
                temp.e = new Date(free.startDate);
                temp.e.setHours(temp.e.getHours()+freeHours);
                temp.s = new Date(free.startDate);
                temp.s.setHours(temp.s.getHours()+freeHours-interval);
                if(temp.s.getHours() >= rootStart.getHours() && temp.e.getHours() <= rootEnd.getHours()) {
                    hourSlots.push({calName: calObj.name, startDate:temp.s, endDate:temp.e});
                    temp = {};
                }
            }
            freeHours--;
        }
    });

    // callBack(freeSlots, hourSlots);
}

export default { currentlyOpen, slotsFromEvents };