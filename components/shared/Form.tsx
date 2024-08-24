import { cn } from "../utils";

export const FormGroup = ({
    label,
    className,
    children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) => {
    const formControl = "flex flex-col text-left grow sm:grow-0 ";
    const buttonGroup = "btn-group1 join drop-shadow";
    const labelClass = "text-xs mb-1";
    return (
        <div className={formControl}>
            <label className={labelClass} htmlFor={label}>
                {label}
            </label>

            <div className={cn(buttonGroup, className)}>{children}</div>
        </div>
    );
};
