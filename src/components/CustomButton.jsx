function CustomButton({ type, children, ...props }) {
  return (
    <button className={`text-center font-bold ${type}`} {...props}>
      {children}
    </button>
  );
}

export default CustomButton;
