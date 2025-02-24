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
 * Design a solution to calculate what to pay for a set of phone calls. The function must receive an 
 * array of objects that will contain the identifier, type and duration attributes. For the type attribute, 
 * the only valid values are: National, International and Local
 * 
 * The criteria for calculating the cost of each call is as follows:
 * 
 * International: first 3 minutes $ 7.56 -> $ 3.03 for each additional minute
 * National: first 3 minutes $ 1.20 -> $ 0.48 per additional minute
 * Local: $ 0.2 per minute.
 * 
 * The function must retur5n the total calls, the details of each call (the detail received + the cost of the call) 
 * and the total to pay taking into account all calls
 * 
 * @param {Call[]} calls - Call's information to be processed
 * 
 * @returns {CallsResponse}  - Processed information
*/

function CostForCall( firstMinutes, costFirstMinutes, extraCost, totalMinutes ){
 /* firstMinutes => value for First "n" Minutos 
    costFirstMinutes => Cost for First Minutes
    extraCost => Cost for Extra minutes
    totalMinutes => Total Minutes */
  let totalCost  = 0;
  if(firstMinutes === 0){
    return(totalCost= extraCost*totalMinutes)
  }else{
    totalCost = costFirstMinutes
    if(totalMinutes > firstMinutes){
      totalCost = totalCost + extraCost*(totalMinutes-firstMinutes)
    }
    return totalCost
  }
}

function callsCost(calls) {
  let callsInformation = {
    totalCalls: calls.length,
    callsDetails: [],
    total: 0,
  }

  calls.forEach( call => {
    switch (call.type) {
      case 'International':
          callsInformation.total += CostForCall( 3 , 7.56, 3.03, call.duration)
          callsInformation.callsDetails.push({...call , callCost:CostForCall( 3 , 7.56, 3.03, call.duration)})
        break;
      case 'National':
          callsInformation.total += CostForCall( 3 , 1.2, 0.48, call.duration)
          callsInformation.callsDetails.push({...call , callCost:CostForCall( 3 , 1.20, 0.48, call.duration)})
        break;
      default:
          callsInformation.total += CostForCall( 0 , 0, 0.2, call.duration)
          callsInformation.callsDetails.push({...call , callCost:CostForCall( 0 , 0, 0.2, call.duration)})
        break;
    }
  })

  return callsInformation
}

module.exports = callsCost;
