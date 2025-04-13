const Logo = (props) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"

    {...props}
  >
    <circle cx="40" cy="40" r="36" fill="#4F46E5" />
    <path
      d="M28 40l8 8 16-20"
      stroke="#FFFFFF"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default Logo;
