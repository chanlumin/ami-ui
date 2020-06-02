import * as React from 'react';
import classNames from 'classnames';
export type SizeType = 'sm' | 'lg' | undefined;

export enum ButtonType {
  default = 'default',
  primary = 'primary',
  ghost = 'ghost',
  dashed = 'dashed',
  danger = 'danger',
  link = 'link',
}

export enum ButtonShape {
  circle = 'circle',
  circleOutline = 'circleOutline',
  round = 'round',
}

export interface BaseButtonProps {
  type?: ButtonType;
  // icon?: React.ReactNode
  shape?: ButtonShape;
  size?: SizeType;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

interface ButtonTypeProps extends React.FC<BaseButtonProps> {}

const Button: ButtonTypeProps = ({ ...props }) => {
  const {
    type,
    shape,
    size,
    loading,
    prefixCls,
    className,
    ghost,
    danger,
    block,
    children,
  } = props;
  // const classes = classNames()

  return <div>'button'</div>;
};

Button.defaultProps = {
  disabled: false,
  type: ButtonType.default,
};

export default Button;
