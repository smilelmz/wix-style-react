import React from 'react';
import { node, bool, func, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import CheckboxChecked from 'wix-ui-icons-common/system/CheckboxChecked';
import CheckboxIndeterminate from 'wix-ui-icons-common/system/CheckboxIndeterminate';
import Label from '../Label';
import styles from './Checkbox.scss';
import WixComponent from '../BaseComponents/WixComponent';
import { withFocusable, focusableStates } from '../common/Focusable';

import { generateID } from '../utils/generateId';
import Tooltip from '../Tooltip';
import * as DATA_ATTR from './DataAttr';

/** a simple WixStyle checkbox */
class Checkbox extends WixComponent {
  static displayName = 'Checkbox';

  constructor(props) {
    super(props);

    this.state = { isFocused: false };
  }

  static propTypes = {
    /** used for automatic testing */
    checked: bool,
    children: node,
    /** Is checkbox disabled */
    disabled: bool,
    /** Does checkbox has an error */
    hasError: bool,
    id: string,
    /** Checkbox is in an indeterminate state */
    indeterminate: bool,
    /** The error message when there's an error */
    errorMessage: string,
    /** Selection area emphasises the clickable area, none means no emphasis, hover is when the mouse is on the component, and always will show constantly */
    selectionArea: oneOf(['none', 'hover', 'always']),
    /** Positioning of the checkbox compared to the label */
    vAlign: oneOf(['center', 'top']),

    /** used for automatic testing */
    hover: bool,
    size: oneOf(['medium']),
    onChange: func,
  };

  static defaultProps = {
    checked: false,
    size: 'medium',
    selectionArea: 'none',
    vAlign: 'center',
    onChange: e => e.stopPropagation(),
  };

  //TODO fix me please. We need to get away from ids.
  _id = `${Checkbox.displayName}-${generateID()}`;

  _getDataAttributes = () => {
    const { checked, indeterminate, disabled, hasError } = this.props;
    return {
      [DATA_ATTR.DATA_CHECK_TYPE]: indeterminate
        ? DATA_ATTR.CHECK_TYPES.INDETERMINATE
        : checked
        ? DATA_ATTR.CHECK_TYPES.CHECKED
        : DATA_ATTR.CHECK_TYPES.UNCHECKED,
      [DATA_ATTR.DATA_HAS_ERROR]: hasError && !disabled,
      [DATA_ATTR.DATA_DISABLED]: disabled,
    };
  };

  render() {
    const {
      id = this._id,
      checked,
      indeterminate,
      disabled,
      hasError,
      errorMessage,
      selectionArea,
      vAlign,
      hover,
      size,
      onChange,
      children,
    } = this.props;

    const classname = classNames(
      styles.root,
      indeterminate
        ? styles.indeterminate
        : checked
        ? styles.checked
        : styles.unchecked,
      {
        [styles.hover]: hover,
        [styles.disabled]: disabled,
        [styles.hasError]: hasError && !disabled,
        [styles.selectionAreaAlways]: selectionArea === 'always',
        [styles.selectionAreaHover]: selectionArea === 'hover',
      },
    );

    /*
    NOTE: attaching Focusable handlers to root div (when the tabindex was on the main div under the label) is not working. The onFocus does not get
    called when clicking on the text (the children). So I moved the tabindex to the root.
    */
    return (
      <div
        ref={this.rootRef}
        className={classname}
        onFocus={this.props.focusableOnFocus}
        onBlur={this.props.focusableOnBlur}
        {...focusableStates(this.props)}
        tabIndex={disabled ? null : 0}
        {...this._getDataAttributes()}
      >
        <input
          data-hook="checkbox-input"
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={disabled ? null : onChange}
          style={{ display: 'none' }}
        />

        <Label
          for={id}
          dataHook="checkbox-label"
          className={classNames({
            [styles.vtop]: vAlign === 'top',
          })}
        >
          <Tooltip
            upgrade
            dataHook="checkbox-box"
            disabled={disabled || !hasError || !errorMessage}
            placement={'top'}
            textAlign="center"
            content={errorMessage || ' '}
            maxWidth={230}
            hideDelay={150}
            zIndex={10000}
          >
            <div className={styles.outer}>
              <div className={classNames(styles.checkbox, styles[size])}>
                <div
                  className={styles.inner}
                  onClick={e => e.stopPropagation()}
                >
                  {indeterminate ? (
                    <CheckboxIndeterminate />
                  ) : (
                    <CheckboxChecked />
                  )}
                </div>
              </div>
            </div>
          </Tooltip>
          {children && (
            <div className={styles.children} data-hook="checkbox-children">
              {children}
            </div>
          )}
        </Label>
      </div>
    );
  }
}

export default withFocusable(Checkbox);
