

export const initialTimeRangeState = {
    timeInMilliSeconds: 0,
    buttonText: 'Show all Posts'
}

export const timeRangeReducer = (state, action) => {
    switch (action.type) {
        case 'all':
            return state = {
                timeInMilliSeconds: 0,
                buttonText: 'Show all Posts'
            };
        case 'lastYear':
            return state = {
                timeInMilliSeconds: new Date().getTime() - 31556952000,
                buttonText: 'Show Posts of the last Year'
            }; // 31556952000 is one year in Milliseconds
        case 'lastMonth':
            return state = {
                timeInMilliSeconds: new Date().getTime() - 2629800000,
                buttonText: 'Show Posts of the last Month'
            }; // oneMonth in MilliSeconds
        case 'lastWeek':
            return {
                timeInMilliSeconds: new Date().getTime() - 604800000,
                buttonText: 'Show Posts of the last Week'
            };
        case 'lastDay':
            return {
                timeInMilliSeconds: new Date().getTime() - 86400000,
                buttonText: 'Show Posts of the last Day'
            };
        case 'lastHour':
            return {
                timeInMilliSeconds: new Date().getTime() - 3600000,
                buttonText: 'Show Posts of the last Hour'   
            };
        default:
            return state = {
                timeInMilliSeconds: 0,
                buttonText: 'Show all Posts'
            };

    }
}