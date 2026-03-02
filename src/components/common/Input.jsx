function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label>{label}</label>}
      <br />
      <input
        {...props}
        style={{
          padding: "6px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default Input;