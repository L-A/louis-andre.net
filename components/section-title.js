export default ({ children, compact }) => (
  <h2>
    {children}
    <style jsx>{`
      h2 {
        color: #f95d0c;
        font-size: 14px;
        font-weight: 700;
        margin: ${compact ? "64px 0 32px" : "128px 0 64px"};
        position: relative;
      }

      h2::before {
        content: "";
        border-top: solid 2px #f2f5f8;
        position: absolute;
        width: 3000px;
        left: -3000px;
        margin-left: -16px;
        top: 50%;
        height: 2px;
      }
    `}</style>
  </h2>
)
