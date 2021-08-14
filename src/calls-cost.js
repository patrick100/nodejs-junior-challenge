/**
 * @typedef {Object} Call
 * @property {string} identifier - Call's identifier
 * @property {string} type - Call's type
 * @property {number} duration - Call's duration
 */

/**
 * @typedef {Object} ProcessedCall
 * @property {string} identifier - Call's identifier
 * @property {string} type - Call's type
 * @property {number} duration - Call's duration
 * @property {number} callCost - Call's cost
 */

/**
 * @typedef {Object} CallsResponse
 * @property {number} totalCalls - Number of processed calls
 * @property {number} total - Total to pay including all the processed calls
 * @property {ProcessedCall[]} callsDetails - Processed information about calls
 */

/** 
 * Design a solution to calculate what to pay for a set of phone calls. The function must receive an array of objects that will contain 
 * the identifier, type and duration attributes. For the type attribute, the only valid values are: National, International and Local
 * 
 * The criteria for calculating the cost of each call is as follows:
 * 
 * International: first 3 minutes $ 7.56 -> $ 3.03 for each additional minute
 * National: first 3 minutes $ 1.20 -> $ 0.48 per additional minute
 * Local: $ 0.2 per minute.
 * 
 * The function must return the total calls, the details of each call (the detail received + the cost of the call) and the total to pay 
 * taking into account all calls
 * 
 * @param {Call[]} calls - Call's information to be processed
 * 
 * @returns {CallsResponse}  - Processed information
*/

function callsCost(calls) {
    const calculateCallCost = (duration, firstMinutes, costByEachFirstMinute, costByAdditionalMinute) => {
        const additionalMinutes = duration - firstMinutes;

        if (duration > firstMinutes) {
            return (firstMinutes * costByEachFirstMinute) + (additionalMinutes * costByAdditionalMinute);
        } else {
            return duration * costByEachFirstMinute;
        }
    }

    const callsDetails = [];
    let total = 0;

    calls.forEach(call => {
        switch (call.type) {
            case 'International': {
                const firstMinutes = 3;
                const costByEachFirstMinute = 7.56;
                const costByAdditionalMinute = 3.03;
                const callCost = calculateCallCost(call.duration, firstMinutes, costByEachFirstMinute, costByAdditionalMinute);
                total += callCost;
                callsDetails.push({ ...call, callCost });
                break;
            }
            case 'National': {
                const firstMinutes = 3;
                const costByEachFirstMinute = 1.20;
                const costByAdditionalMinute = 0.48;
                const callCost = calculateCallCost(call.duration, firstMinutes, costByEachFirstMinute, costByAdditionalMinute);
                total += callCost;
                callsDetails.push({ ...call, callCost });
                break;
            }
            case 'Local': {
                const costByMinute = 0.2;
                const callCost = call.duration * costByMinute;
                total += callCost;
                callsDetails.push({ ...call, callCost });
                break;
            }
            default: {
                break;
            }
        }
    });

    total = Math.round(total * 100) / 100;
    const callsResponse = { totalCalls: callsDetails.length, total, callsDetails };

    return callsResponse;
}

module.exports = callsCost