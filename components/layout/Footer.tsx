const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        &copy; {year} All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
