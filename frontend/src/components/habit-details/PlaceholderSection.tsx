type Props = {
  title: string;
  description?: string;
};

const PlaceholderSection = ({ title, description }: Props) => {
  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1.25rem",
        border: "1px dashed #444",
        borderRadius: "8px",
        opacity: 0.8,
      }}
    >
      <h2>{title}</h2>
      <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
        {description ?? "Coming soon"}
      </p>
    </section>
  );
};

export default PlaceholderSection;