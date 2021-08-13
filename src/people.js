/**
 * @typedef {Object} Person
 * @property {string} name - Person's name
 * @property {string} lastname - Person's lastname
 * @property {number} age - Person's age
 * @property {number} weight - Person's weight
 * @property {number} height - Person's height
 */

/**
 * @typedef {Object} PeopleResponse
 * @property {number} ageProm - People average age
 * @property {number} heightProm - People average height
 * @property {Person} youngerPerson - Younger person information
 * @property {Person} tallerPerson - Taller person information
 */

/** 
 * The height in cm of several people was taken, in addition, the age of each person and extra information are also known.
 * An algorithm is required to calculate average age and average height. In addition, we need to know the information of the 
 * tallest person, and the information of the youngest person.
 * 
 * @param {Person[]} people - People information to be processed
 * 
 * @returns {PeopleResponse}  - Processed information
*/


function peopleInformation(people) {
    const totalPeople = people.length;
    const peopleResponse = {
        ageProm: people[0].age,
        heightProm: people[0].height,
        youngerPerson: people[0],
        tallerPerson: people[0]
    }

    for (let i = 1; i < totalPeople; i++) {
        peopleResponse.ageProm += people[i].age;
        peopleResponse.heightProm += people[i].height;
        peopleResponse.youngerPerson = people[i].age < peopleResponse.youngerPerson.age ? people[i] : peopleResponse.youngerPerson;
        peopleResponse.tallerPerson = people[i].height > peopleResponse.tallerPerson.height ? people[i] : peopleResponse.tallerPerson;
    }

    peopleResponse.ageProm = Math.round(peopleResponse.ageProm / totalPeople);
    peopleResponse.heightProm = Math.round(peopleResponse.heightProm / totalPeople);

    return peopleResponse;
}

module.exports = peopleInformation