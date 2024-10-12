// index.js
const { mentors, mentee } = require('./data');
const math = require('mathjs');

let highestScore = -1;

const WEIGHT_SKILLS = 0.5;
const WEIGHT_INDUSTRY = 0.3;
const WEIGHT_GOALS = 0.2;

function applyWeights(vector) {
  const weightedVector = [
    ...vector.slice(0, 5).map(v => v * WEIGHT_SKILLS),  // Skills
    ...vector.slice(5, 7).map(v => v * WEIGHT_INDUSTRY), // Industry
    ...vector.slice(7).map(v => v * WEIGHT_GOALS)        // Goals
  ];
  return weightedVector;
}

// Function to calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = math.dot(vecA, vecB);
  const magnitudeA = math.norm(vecA);
  const magnitudeB = math.norm(vecB);
  
  return dotProduct / (magnitudeA * magnitudeB);
}


// Find the best mentor match
function findBestMentor(mentee, mentors) {
  let bestMatch = null;

  const weightedMenteeVector = applyWeights(mentee.vector);

  mentors.forEach(mentor => {
    const weightedMentorVector = applyWeights(mentor.vector);
    const score = cosineSimilarity(weightedMenteeVector, weightedMentorVector);
    //const score = cosineSimilarity(mentee.vector, mentor.vector);
    //console.log(`Cosine similarity between ${mentee.name} and ${mentor.name}: ${score}`);
    console.log(`Weighted cosine similarity between ${mentee.name} and ${mentor.name}: ${score}`);
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = mentor;
    }
  });

  return bestMatch;
}

const bestMentor = findBestMentor(mentee, mentors);

if (bestMentor) {
  console.log(`Best mentor for ${mentee.name} is ${bestMentor.name} with a score of ${highestScore}`);
} else {
  console.log('No mentor found');
}

