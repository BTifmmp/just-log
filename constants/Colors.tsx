const Colors = {
  gray: {
    "50": "rgb(16, 16, 19)",      // backgroundGrayLowest  
    "100": "rgb(16, 16, 19)",
    "150": "rgb(30, 30, 36)",
    "200": "rgb(40, 40, 48)",      // backgroundGrayLow  
    "250": "rgb(46, 46, 54)",
    "300": "rgb(52, 52, 60)",      // backgroundGrayMid  
    "350": "rgb(64, 64, 73)",
    "400": "rgb(68, 68, 76)",      // backgroundGrayHigh  
    "450": "rgb(75, 75, 84)",
    "500": "rgb(82, 82, 92)",      // backgroundGrayHighest  
    "550": "rgb(100, 100, 110)",
    "600": "rgb(120, 120, 129)",
    "650": "rgb(145, 145, 155)",   // textLowest
    "700": "rgb(165, 165, 172)",
    "750": "rgb(185, 185, 192)",   // textLow  
    "800": "rgb(200, 200, 210)",
    "850": "rgb(220, 220, 230)",   // textMid  
    "900": "rgb(240, 240, 247)",
    "950": "rgb(255, 255, 255)"    // textHigh  
  },

  red: {
    "50": "rgb(255, 215, 215)",  // Lightest
    "100": "rgb(255, 191, 191)",
    "200": "rgb(255, 163, 163)",
    "300": "rgb(252, 130, 130)",
    "400": "rgb(247, 105, 105)",
    "500": "rgb(236, 72, 72)",  // Base color (textRedMid)
    "600": "rgb(210, 62, 62)",
    "700": "rgb(184, 52, 52)",
    "800": "rgb(157, 42, 42)",
    "900": "rgb(131, 32, 32)"   // Darkest
  },

  textGreenLowest: 'rgb(30, 134, 52)',
  textGreenMid: 'rgb(72, 236, 113)',
  textGreenHigh: 'rgb(132, 243, 122)',

  textBlueLowest: 'rgb(13, 46, 83)',
  textBlueMid: 'rgb(93, 159, 235)',
  textBlueHigh: 'rgb(122, 178, 243)',

  blue: {
    "50": "rgb(180, 225, 255)",
    "100": "rgb(150, 210, 255)",
    "200": "rgb(124, 181, 255)",
    "300": "rgb(72, 157, 255)",
    "400": "rgb(83, 160, 248)",
    "500": "rgb(35, 134, 233)",
    "600": "rgb(30, 115, 210)",
    "700": "rgb(20, 95, 180)",
    "800": "rgb(15, 75, 150)",
    "900": "rgb(10, 55, 120)"
  },
  spacer: 'rgb(32, 32, 36)',
  spacerLight: 'rgb(64, 64, 70)',

  addOpacity: (color: string, opacity: number) => {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

}

export default Colors;