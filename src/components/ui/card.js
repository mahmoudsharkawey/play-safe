export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md hover:border-foreground/20 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`p-4 pb-2 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-base font-semibold leading-none ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-4 pt-0 text-sm text-muted-foreground ${className}`} {...props} />;
}


