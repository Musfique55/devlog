
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";


interface AppFieldsProps {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "number";
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
export default function AppFields({
  field,
  label,
  placeholder,
  type,
  append,
  prepend,
  className,
  disabled = false,
}: AppFieldsProps) {
  const firstError = field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.message : null;
  const hasError = firstError !== null;



  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name} className="text-sm font-medium text-gray-300">
        {label}
      </Label>
      <div className="relative">
        {prepend && (
          <div className="absolute left-1 top-1/2 -translate-y-1/2">
            {prepend}
          </div>
        )}
        <Input
          type={type}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className={cn(className, 
            "text-gray-200",
            prepend && "pl-10",
            append && "pr-10",
            hasError && "border-destructive ring-destructive/20 focus:ring-destructive")}
          disabled={disabled}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
        />
        {append && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            {append}
          </div>
        )}
      </div>
      {hasError && <p id={`${field.name}-error`} role="alert" className="text-sm text-red-500">{firstError}</p>}
    </div>
  );
}
