import AbstractComponent from './abstract-component.js';
import {ERRORS} from '../const.js';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`${ERRORS.IMPLEMENT_RECOVERY_LISTENERS}`);
  }

  rerender(film) {
    const oldElement = this._element;
    this.removeElement();
    const parent = oldElement.parentElement;
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners(film);
  }
}

export default AbstractSmartComponent;
