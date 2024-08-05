import React from "react";

interface TitlePageProps {
  title: string;
  subtitle?: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title, subtitle }) => {
  return (
    <div className="my-8 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default TitlePage;
