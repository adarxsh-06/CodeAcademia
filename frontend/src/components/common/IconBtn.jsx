export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center justify-center outline-none ${
        outline ? "border border-[#FFF970] bg-transparent" : "bg-[#FFF970]"
      } gap-x-2 rounded-md py-2 px-5 font-semibold text-[#141414] hover:bg-black hover:text-[#FFF970] duration-300 ${customClasses}
                ${
                  disabled &&
                  "cursor-not-allowed hover:bg-[#FFF970] hover:text-black"
                } `}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-[#FFF970]"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
