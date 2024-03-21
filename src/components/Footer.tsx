const newYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <p className="px-8 text-center">
        © {newYear}{" "}
        <a
          href="https://www.linkedin.com/in/jhosbel-vargas"
          target="_blank"
          className="hover:underline"
        >
          JhosbelDev
        </a>
        . Todos los derecho reservado.
      </p>
    </footer>
  );
};

export default Footer;
