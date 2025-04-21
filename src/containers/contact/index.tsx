import React from "react";
import { Section, Title, Button } from "../../common/components";
import styles from "./Contact.module.css";

const Contact: React.FC = () => (
  <Section id="contact" bg="base" padding="lg">
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
                  // Entre em contato comigo
                </span>
              </p>
              <p className={styles.codeLine}>
                <span className={styles.codeConst}>const</span>{" "}
                <span className={styles.codeVar}>email</span> ={" "}
                <span className={styles.codeString}>
                  "alyssonmichel20@gmail.com"
                </span>
                ;
              </p>
              <p className={styles.codeLine}>
                <span className={styles.codeConst}>const</span>{" "}
                <span className={styles.codeVar}>local</span> ={" "}
                <span className={styles.codeString}>
                  "Pernambucano, BR"
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
                  // Envie sua mensagem
                </span>
              </p>
              <p className={styles.codeLine}>
                <span className={styles.codeFunction}>function</span>{" "}
                <span className={styles.codeVar}>enviarMensagem</span>() {"{"}
              </p>
              <p className={styles.codeLine}>
                {" "}
                <span className={styles.codeReturn}>return</span>{" "}
                <span className={styles.codeString}>"Opa, amigo!"</span>;
              </p>
              <p className={styles.codeLine}>{"}"}</p>
            </div>
          </div>
        </div>

        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Nome
            </label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              placeholder="Seu nome completo"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              placeholder="seu@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Mensagem
            </label>
            <textarea
              id="message"
              className={styles.formTextarea}
              placeholder="Descreva sua proposta ou dúvida..."
              rows={5}
            />
          </div>

          <Button
            variant="terminal"
            size="lg"
            type="submit"
            className={styles.submitButton}
          >
            Enviar Mensagem
          </Button>
        </form>
      </div>
    </div>
  </Section>
);

export default Contact;
