import styled from 'styled-components';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  icon?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  onClick?: Function;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const handleButtonOnClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <div
      className={styles.btn}
      style={{
        width: props.width + 'rem' ?? '8rem',
        height: props.height + 'rem' ?? '0.8rem',
      }}
      onClick={handleButtonOnClick}
    >
      <img src={props.icon} />
      {props.text}
    </div>
  );
};
