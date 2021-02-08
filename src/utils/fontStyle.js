const fontSize = [14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
const fontColor = [
  '#368FFF', '#3FD79F', '#356E9A', '#FFAE01', '#FF553A',
  '#44C3FF', '#8E6CD2', '#B4D643', '#179AA6', '#FF66A5'
];
const fontWeight = ['normal', 'bold', 'bolder', 'lighter'];

function getNum(length) {
  return Math.floor(Math.random() * length);
}

export default function() {
  // const min = Math.min();
  return {
    color: fontColor[getNum(fontColor.length)],
    fontSize: fontSize[getNum(fontSize.length)] + 'px',
    fontWeight: fontWeight[getNum(fontWeight.length)]
  };
}
