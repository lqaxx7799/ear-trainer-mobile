function getRandomInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateToneScript(noteArray: string[], type: string) {

}

export default {
  getRandomInRange,
  generateToneScript,
};
