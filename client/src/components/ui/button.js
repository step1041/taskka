import React, {Component} from 'react';

import './button.scss';

class ButtonTooltip extends Component {
  get position() {
    return this.props.position || 'top';
  }

  get className() {
    return `tooltip ${this.position}`;
  }

  render() {
    return (
      <div className={this.className}>{this.props.children}</div>
    );
  }
}

class Button extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  getClassName() {
    let classNames = ['button'];

    if (this.props.disabled) {
      classNames.push('disabled');
    }
    else if (this.props.buttonStyle) {
      classNames.push(this.props.buttonStyle);
    }

    if (this.props.className) {
      classNames.push(this.props.className);
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className={'button-wrapper'}>
        <div className={this.getClassName()} onClick={this.onClick}>
          {this.props.children}
        </div>
        {this.props.tooltip && (
          <ButtonTooltip position={this.props.tooltipPosition}>{this.props.tooltip}</ButtonTooltip>
        )}
      </div>
    );
  }

  onClick() {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

export default Button;
