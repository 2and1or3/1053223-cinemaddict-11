import AbstractComponent from './abstract-component.js';
import {ERRORS} from '../const.js';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`${ERRORS.IMPLEMENT_RECOVERY_LISTENERS}`);
  }

  rerender() {
    const oldElement = this._element;
    this.removeElement();
    const parent = oldElement.parentElement;
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
  }
}

export default AbstractSmartComponent;
