/**
 * 卡片及其父元素的width
 */

// console.log(constants);
import { WIDTH_INIT, WIDTH_CHANGE } from "../constants";
import { Width } from "../interfaces/Width";
export const margin: number = 20;

export interface WidthAction {
  type: string;
  width: Width;
}

let widthInitObj: Width = getWidth();
const initialState: Width = {
  margin: margin,
  pWidth: widthInitObj.pWidth,
  width: widthInitObj.width,
  windowWidth: widthInitObj.windowWidth
};

export function width(state: Width = initialState, action: WidthAction): Width {
  if (action.type === WIDTH_INIT) {
    return action.width;
  } else if (action.type === WIDTH_CHANGE) {
    return action.width;
  }
  return state;
}

// ---------
export function getWidth(): Width {
  let width: number = 0;
  let pWidth: number = 0;
  let winWidth: number = 0;

  let scrollBar: number = document.body.clientHeight > window.innerHeight ? 17 : 17;

  let bodyWidth: number = window.innerWidth;
  let windowWidth: number = window.innerWidth - margin * 2;
  pWidth = windowWidth;
  winWidth = window.innerWidth;
  if (bodyWidth < 550) {
    // width = 350;
    width = windowWidth;
    pWidth = windowWidth;
  } else if (bodyWidth < 850 && bodyWidth >= 550) {
    width = windowWidth / 2;
    // console.log(bodyWidth, windowWidth, width)
  } else if (bodyWidth < 1050 && bodyWidth >= 850) {
    width = windowWidth / 3;
  } else if (bodyWidth < 1400 && bodyWidth >= 1050) {
    width = windowWidth / 4;
  } else {
    windowWidth = 1400;
    pWidth = windowWidth;
    width = windowWidth / 4;
  }
  return {
    margin,
    pWidth: pWidth,
    width: width,
    windowWidth: winWidth
  };
};
