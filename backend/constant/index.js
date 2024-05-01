// const questionBank = [
//   {
//     qId: 1,
//     qTitle: `How to fix "Uncaught TypeError: Cannot read property Timestamp of undefined"?`,
//     qDesc: `Hi I'm new in web development and I'm trying to make a firebase app with the firestore database. 
//     I have a user registration form and in this form I need to get the date. For the date I used datepicker 
//     but I can't get the selected date and after transform it into firestore Timestamp. I tried this but I don't know if something is correct:`,
//     timeStamp: 1707186750204,
//     totalAnswers: 0,
//     askedByUsername: 'Jack',
//   },
//   {
//     qId: 2,
//     qTitle: `Why does my perpetual CMBR rocket ship not work? Why does the CMBR have infinite energy?`,
//     qDesc: `Take a spaceship and accelerate it to 99.947% the speed of light, effectively blueshifting the Cosmic Microwave Background (CMB)
//      from 1.9mm to 500nm, turning the CMB to a harvestable source of energy. Line the front of the craft which has an annular extrusion shape with solar cells. 
//      Install an extremely efficient linear accelerator that accelerates hydrogen in the center, which only uses hydrogen found along the way.

//     Theoretically, ignoring relativistic damage, by directly harvesting from the CMB (and other light sources), 
//     this craft should be able to accelerate forever. Even past the point of complete blackout of the universe and 
//     cold death (if such a thing exists). Given the CMB is everywhere, and the universe is infinite, therefore the CMB 
//     is infinite, and contains infinite energy, as long as the spacecraft could keep accelerating faster than the CMB
//      is relativistically aging, it should be able to keep on accelerating.`,
//     timeStamp: 1705190400000,
//     totalAnswers: 2,
//     askedByUsername: 'Johnny depp',
//   },
//   {
//     qId: 3,
//     qTitle: `Do fighter jets have windshield wipers?`,
//     qDesc: `wondering if fighter jets do have windshield wipers for the rain. Other airplanes do. I can 
//     imagine that you don't need them because of their speed but I wasn't able to find some clear information about this. 
//     Maybe they use a different kind of windshield wiper, so I'm curious about what they have and use for rainy circumstances for their view.`,
//     totalAnswers: 3,
//     timeStamp: 1706918400000,
//     askedByUsername: 'tommy',
//   },
// ];

const answerBank = {
  1: {
    timeStamp: 1707186750204,
    selectedAnswer: 1,
    answers: []
  },
  2: {
    timeStamp: 1705190400000,
    selectedAnswer: 0,
    answers: [{
      ansId: '',
      userName: "SpaceTechExpert",
      answerUnixStamp: 1705190400000,
      comment: "Have you considered the practical challenges of achieving and maintaining such high speeds in space?",
      answers: [{
        ansId: '',
        userName: "NasaTechExpert",
        answerUnixStamp: 1705190400000,
        comment: "can you explain",
        answers: [{
          ansId: '',
          userName: "NasaTechExpert",
          answerUnixStamp: 1705190400000,
          comment: "can you explain",
        }],
      }],
    }, {
      ansId: '',
      userName: "AstroPhysicist",
      answerUnixStamp: "",
      comment: "Theoretical concepts like perpetual motion in space often overlook the complexities of real-world physics and engineering."
    }]
  },
  3: {
    timeStamp: 1706918400000,
    selectedAnswer: 2,
    answers: [{
      ansId: '',
      userName: "AirForcePilot",
      answerUnixStamp: 1705190400000,
      comment: "Fighter jets usually don't have windshield wipers due to their high speeds and aerodynamic design. Instead, they rely on special coatings and airflow to maintain visibility."
    }, {
      ansId: '',
      userName: "AviationMechanic",
      answerUnixStamp: "",
      comment: "In my experience, fighter jets are equipped with rain-repellent coatings on their windscreens, which are more effective at high speeds than traditional windshield wipers."
    }, {
      ansId: '',
      userName: "FlightInstructor",
      answerUnixStamp: 1705190400000,
      comment: "While some military aircraft may have windshield wipers, they are not commonly found on fighter jets. The emphasis is on aerodynamics and minimizing weight."
    }]
  }
}

module.exports = {
  answerBank
}