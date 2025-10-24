import { KEYS } from '../constants';

/**
 * Checks if the Escape key was pressed
 */
export const isEscapeKey = (event) => {
  return event.key === KEYS.ESCAPE || event.keyCode === 27;
};

/**
 * Checks if the Tab key was pressed
 */
export const isTabKey = (event) => {
  return event.key === KEYS.TAB || event.keyCode === 9;
};

/**
 * Checks if the Enter key was pressed
 */
export const isEnterKey = (event) => {
  return event.key === KEYS.ENTER || event.keyCode === 13;
};

/**
 * Checks if the Space key was pressed
 */
export const isSpaceKey = (event) => {
  return event.key === KEYS.SPACE || event.keyCode === 32;
};
