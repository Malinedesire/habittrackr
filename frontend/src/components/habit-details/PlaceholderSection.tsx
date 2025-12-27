import "./PlaceholderSection.css";

type Props = {
  title: string;
  description?: string;
};

const PlaceholderSection = ({ title, description }: Props) => {
  return (
    <section className="placeholderSection">
      <h2>{title}</h2>
      <p className="description">{description ?? "Coming soon"}</p>
    </section>
  );
};

export default PlaceholderSection;