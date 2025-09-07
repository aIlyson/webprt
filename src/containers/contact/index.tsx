import React, { useState } from "react";
import { Section, Title, Button } from "../../common/components";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const BLACKLIST = [
    "http://",
    "https://",
    "www.",
    ".com",
    ".xyz",
    ".ga",
    ".cf",
    "promoção",
    "promo",
    "grátis",
    "gratuito",
    "ganhe",
    "clique aqui",
    "oferta",
    "imperdível",
    "viagra",
    "cialis",
    "criptomoeda",
    "bitcoin",
    "btc",
    "eth",
    "ethereum",
    "apostas",
    "cassino",
    "jogos de azar",
    "sexo",
    "pornô",
    "porno",
    "porn",
    "xxx",
    "gay",
    "erótico",
    "fique rico",
    "dinheiro fácil",
    "trabalhe de casa",
    "lucro garantido",
  ];

  const containsSpam = (text: string) => {
    const lowerText = text.toLowerCase();
    return BLACKLIST.some((term) => lowerText.includes(term));
  };

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Por favor, preencha todos os campos!");
      return;
    }

    if (formData.name.length > 50) {
      setError("Nome muito longo (máx. 50 caracteres)");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Por favor, insira um email válido...");
      return;
    }

    if (containsSpam(formData.message) || containsSpam(formData.name)) {
      setError("Mensagem contém conteúdo não permitido");
      return;
    }

    if (formData.message.length > 5000) {
      setError("Mensagem muito longa (máx. 5000 caracteres)");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
        to_email: "alysson.michel@outlook.com",
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log("Email enviado:", response);

      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.error("Erro no envio:", err);
      setError(
        "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section
      id="contact"
      bg="base"
      withPixels={true}
      pixelCount={0}
      padding="lg"
    >
      <div className={styles.contactContainer}>
        <Title level={2} withUnderline align="center">
          Vamos Conversar
        </Title>

        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <div className={styles.codePanel}>
              <div className={styles.codeHeader}>
                <span
                  className={styles.codeDot}
                  style={{ background: "#FF5F56" }}
                />
                <span
                  className={styles.codeDot}
                  style={{ background: "#FFBD2E" }}
                />
                <span
                  className={styles.codeDot}
                  style={{ background: "#27C93F" }}
                />
                <span className={styles.codeTitle}>contact_info.js</span>
              </div>

              <div className={styles.codeContent}>
                <p className={styles.codeLine}>
                  <span className={styles.codeComment}>
                    {"// Entre em contato comigo"}
                  </span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.codeConst}>const</span>{" "}
                  <span className={styles.codeVar}>email</span> ={" "}
                  <span className={styles.codeString}>
                    {'"alyssonmichel20@gmail.com"'}
                  </span>
                  ;
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.codeConst}>const</span>{" "}
                  <span className={styles.codeVar}>local</span> ={" "}
                  <span className={styles.codeString}>
                    {'"Pernambucano, BR"'}
                  </span>
                  ;
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.codeConst}>const</span>{" "}
                  <span className={styles.codeVar}>disponivel</span> ={" "}
                  <span className={styles.codeBoolean}>true</span>;
                </p>
                <br />
                <p className={styles.codeLine}>
                  <span className={styles.codeComment}>
                    {"// Envie sua mensagem"}
                  </span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.codeFunction}>function</span>{" "}
                  <span className={styles.codeVar}>enviarMensagem</span>() {"{"}
                </p>
                <p className={styles.codeLine}>
                  {" "}
                  <span className={styles.codeReturn}>return</span>{" "}
                  <span className={styles.codeString}>{'"Opa, amigo!"'}</span>;
                </p>
                <p className={styles.codeLine}>{"}"}</p>
              </div>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorMessage}>
                <span role="alert">⚠️ {error}</span>
              </div>
            )}

            {isSent && (
              <div className={styles.successMessage}>
                <span>✅ Mensagem enviada com sucesso!</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.formTextarea}
                placeholder="Descreva sua proposta..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                maxLength={1000}
                required
                aria-required="true"
              />
              <div className={styles.charCount}>
                {formData.message.length}/5000 caracteres
              </div>
            </div>

            <Button
              variant="terminal"
              size="lg"
              type="submit"
              className={styles.submitButton}
              disabled={isSending || isSent}
              aria-busy={isSending}
            >
              {isSending
                ? "Enviando..."
                : isSent
                ? "Enviado!"
                : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
