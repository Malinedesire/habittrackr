type LoadingProps = {
  message?: string;
};

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return <p>{message}</p>;
};

export default Loading;