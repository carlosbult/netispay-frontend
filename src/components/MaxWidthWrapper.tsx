import { type ReactNode } from 'react';

interface IMaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

const MaxWidthWrapper = ({
  className,
  children,
  style,
}: IMaxWidthWrapperProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-screen-2xl px-2.5 md:px-20 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
