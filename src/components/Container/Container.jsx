/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

function Container({children, className=""}) {
  return (
    <div className={`w-full max-w-[88rem] mx-auto px-5 ${className}`}>{children}</div>
  )
}

export default Container;