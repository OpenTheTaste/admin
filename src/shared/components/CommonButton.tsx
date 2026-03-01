export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const CommonButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: CommonButtonProps) => {
  const baseStyle = "flex items-center justify-center gap-4 rounded-lg cursor-pointer";

  const variantStyles: Record<NonNullable<CommonButtonProps["variant"]>, string> = {
    primary: "bg-ot-primary-gradient-btn text-ot-text",
    secondary: "bg-ot-secondary-700 text-ot-text hover:bg-ot-secondary-800",
    outline: "border border-ot-primary-400 bg-none text-ot-primary-400 hover:bg-ot-primary-100",
  };

  const variantStyle = variantStyles[variant];

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
