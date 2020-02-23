import React from 'react';
import PropTypes from 'prop-types';
import styles from './FloatingHelperContent.st.css';
import { floatingHelperAppearance } from '../constants';
import { dataHooks, actionButtonTheme } from './constants';
import Text from '../../Text';
import Button from '../../Button';
import {
  SKINS as ButtonSkin,
  PRIORITY as ButtonPriority,
} from '../../Button/constants';

const themeToButtonProps = {
  [actionButtonTheme.white]: {
    skin: ButtonSkin.white,
    priority: ButtonPriority.secondary,
  },
  [actionButtonTheme.standard]: {
    skin: ButtonSkin.standard,
    priority: ButtonPriority.secondary,
  },
  [actionButtonTheme.premium]: {
    skin: ButtonSkin.premium,
    priority: ButtonPriority.primary,
  },
  [actionButtonTheme.lightPrimary]: {
    skin: ButtonSkin.white,
    priority: ButtonPriority.primary,
  },
};

/** FloatingHelperContent */
const FloatingHelperContent = props => {
  const {
    title,
    body,
    actionText,
    onActionClick,
    actionTheme,
    image,
    appearance,
    footer,
  } = props;

  return (
    <div {...styles('root', { hasBody: !!props.body }, props)}>
      <div>
        {title && (
          <div className={styles.title}>
            <Text
              data-hook={dataHooks.title}
              weight="bold"
              light={appearance === floatingHelperAppearance.dark}
            >
              {title}
            </Text>
          </div>
        )}
        {body && (
          <div>
            <Text
              data-hook={dataHooks.body}
              light={appearance === floatingHelperAppearance.dark}
            >
              {body}
            </Text>
          </div>
        )}

        {actionText && onActionClick && actionText.length > 0 && (
          <Button
            {...themeToButtonProps[actionTheme]}
            data-hook={dataHooks.actionButton}
            onClick={onActionClick}
            size="small"
          >
            {actionText}
          </Button>
        )}
        {footer && (
          <div data-hook={dataHooks.footer} className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
      {image && (
        <div data-hook={dataHooks.image} className={styles.image}>
          {image}
        </div>
      )}
    </div>
  );
};

FloatingHelperContent.displayName = 'FloatingHelperContent';

FloatingHelperContent.propTypes = {
  /** Adds text as the title */
  title: PropTypes.string,
  /** Adds text as the body */
  body: PropTypes.string.isRequired,
  /** Sets the text of the action button. Needs to be a non-empty string (and onActionClick prop has to be passed) in order for the action button to appear */
  actionText: PropTypes.string,
  /** Sets the theme of the action button */
  actionTheme: PropTypes.oneOf([
    'standard',
    'white',
    'premium',
    'lightPrimary',
  ]),
  /** Custom footer node */
  footer: PropTypes.node,
  /** When both onActionClick & actionText are provided, will make an action button appear and invoke onActionClick() upon click */
  onActionClick: PropTypes.func,
  /** Adds an image */
  image: PropTypes.node,
  /** Appearance : `dark` or `light`. */
  appearance: PropTypes.oneOf(['dark', 'light']),
};

FloatingHelperContent.defaultProps = {
  actionTheme: 'white',
  appearance: 'dark',
};

export default FloatingHelperContent;
