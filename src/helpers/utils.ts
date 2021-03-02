import _ from 'lodash';

function getRandomInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateToneScript(noteArray: string[], type: string) {
  const script = _.reduce(noteArray, (result, value, index) => {
    return result + `synth.triggerAttackRelease("${value}", "4n", now + ${index});`
  }, '');
  
  return 'now = Tone.now(0);' + script;
}

export default {
  getRandomInRange,
  generateToneScript,
};
