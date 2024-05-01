class QnAUtility {
  static getColorForLetter = (letter) => {
    const colorMap = {
      A: '#FF5733',
      B: '#FF8C00',
      C: '#FFA500',
      D: '#FFD700',
      E: '#FFFF00',
      F: '#32CD32',
      G: '#008000',
      H: '#006400',
      I: '#000080',
      J: '#0000CD',
      K: '#0000FF',
      L: '#8A2BE2',
      M: '#9932CC',
      N: '#8B008B',
      O: '#FF00FF',
      P: '#FF69B4',
      Q: '#FF1493',
      R: '#FF4500',
      S: '#A52A2A',
      T: '#D2691E',
      U: '#800000',
      V: '#4B0082',
      W: '#2E8B57',
      X: '#20B2AA',
      Y: '#556B2F',
      Z: '#008B8B',
    };
    return colorMap[letter.toUpperCase()] || '#333'; // Default to a dark color if letter not found
  };
}

export default QnAUtility;
