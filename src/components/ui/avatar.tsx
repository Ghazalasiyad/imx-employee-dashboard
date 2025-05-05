type AvatarProps = {
    src: string;
    alt?: string;
    className?: string;
  };
  
  export const Avatar = ({ src, alt = "User Avatar", className }: AvatarProps) => {
    return (
      <div
        className={`w-10 h-10 overflow-hidden rounded-full bg-none ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover bg-none"
        />
      </div>
    );
  };
  