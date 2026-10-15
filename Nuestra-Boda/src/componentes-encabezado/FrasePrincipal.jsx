
import { motion } from "framer-motion";

/* =========================================
   PALETA DE COLORES
========================================= */

const palette = {
  olive: "#3F4A2C",
  oliveDark: "#303A22",
  ivory: "#F7F4EC",
  beige: "#D7C8AA",
  white: "#FFFFFF",
};

const ease = [0.22, 1, 0.36, 1];

/* =========================================
   ADORNO BOTÁNICO
========================================= */

function BotanicalCorner({ className = "" }) {
  return (
    <svg
      viewBox="0 0 130 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M18 166C42 137 60 105 73 68C82 43 91 24 109 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <path
        d="M48 126C32 121 25 110 25 96C40 99 49 109 48 126Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M62 96C76 91 86 80 89 66C75 68 65 78 62 96Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M74 66C60 60 54 49 55 36C68 40 76 51 74 66Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M88 39C101 36 109 28 112 17C100 19 91 27 88 39Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <circle
        cx="110"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* =========================================
   SEPARADOR
========================================= */

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className="h-px w-10 sm:w-14"
        style={{
          backgroundColor: palette.beige,
        }}
      />

      <span
        className="h-[6px] w-[6px] rotate-45 border"
        style={{
          borderColor: palette.beige,
        }}
      />

      <span
        className="h-px w-10 sm:w-14"
        style={{
          backgroundColor: palette.beige,
        }}
      />
    </div>
  );
}

/* =========================================
   RECONFIRMACIÓN DE ASISTENCIA
========================================= */

export default function FraseModal() {
  return (
    <section
      className="
        relative w-full
        overflow-hidden
        bg-white
        px-4 py-20
        sm:px-8 sm:py-28
        md:py-32
      "
    >
      {/* ENCABEZADO EXTERIOR */}

      <motion.div
        className="
          mx-auto mb-10
          flex flex-col
          items-center text-center
        "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p
          className="
            text-[10px]
            uppercase tracking-[0.4em]
            sm:text-[11px]
          "
          style={{ color: palette.olive }}
        >
          Eimy Edith & Andre Soni
        </p>

        <div
          className="mt-5 h-px w-16"
          style={{ backgroundColor: palette.beige }}
        />

        <p
          className="
            mt-5 font-serif
            text-[12px]
            uppercase tracking-[0.25em]
          "
          style={{ color: palette.oliveDark }}
        >
          Reconfirmación de asistencia
        </p>
      </motion.div>

      {/* TARJETA VERDE OLIVO */}

      <motion.div
        className="
          relative mx-auto
          w-full max-w-[760px]
          overflow-hidden
          bg-[#3F4A2C]
          px-8 py-16
          text-center
          sm:px-16 sm:py-20
          md:px-20 md:py-24
        "
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        {/* MARCO EXTERIOR */}

        <div
          className="
            pointer-events-none
            absolute inset-3
            border
            sm:inset-5
          "
          style={{
            borderColor: "rgba(247,244,236,0.45)",
          }}
        />

        {/* MARCO INTERIOR */}

        <div
          className="
            pointer-events-none
            absolute inset-[17px]
            border
            sm:inset-[26px]
          "
          style={{
            borderColor: "rgba(247,244,236,0.15)",
          }}
        />

        {/* ADORNOS BOTÁNICOS */}

        <BotanicalCorner
          className="
            pointer-events-none
            absolute -bottom-5 -left-4
            h-[150px] w-[110px]
            text-[#F7F4EC]/25
            sm:h-[200px] sm:w-[145px]
          "
        />

        <BotanicalCorner
          className="
            pointer-events-none
            absolute -right-4 -top-5
            h-[150px] w-[110px]
            rotate-180
            text-[#F7F4EC]/25
            sm:h-[200px] sm:w-[145px]
          "
        />

        {/* CONTENIDO DE LA TARJETA */}

        <div
          className="
            relative z-10
            mx-auto flex
            max-w-[560px]
            flex-col items-center
          "
        >
          {/* DETALLE SUPERIOR */}

          <motion.p
            className="
              font-serif text-[11px]
              uppercase tracking-[0.35em]
            "
            style={{ color: palette.beige }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nuestra boda
          </motion.p>

          {/* TÍTULO */}

          <motion.h2
            className="
              mt-7
              font-cursiveDancing
              text-[38px]
              leading-[1.2]
              sm:text-[52px]
              md:text-[58px]
            "
            style={{ color: palette.white }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease,
            }}
          >
            ¡Ya falta poco
            <br />
            para nuestra boda!
          </motion.h2>

          {/* SEPARADOR */}

          <div className="mt-8">
            <Divider />
          </div>

          {/* MENSAJE PRINCIPAL */}

          <motion.p
            className="
              mt-9
              font-serif
              text-[15px]
              leading-[1.95]
              sm:text-[17px]
            "
            style={{ color: palette.ivory }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease,
            }}
          >
            Cada día estamos más cerca de celebrar
            uno de los momentos más especiales
            de nuestras vidas.
            <br />
            <br />
            Para ayudarnos a preparar cada detalle
            de este día, nos gustaría pedirte
            que nos{" "}
            <span className="font-semibold">
              reconfirmes tu asistencia.
            </span>
          </motion.p>

          {/* FECHA LÍMITE */}

          <motion.div
            className="
              mt-10 w-full
              max-w-[390px]
              border-y
              px-4 py-7
            "
            style={{
              borderColor: "rgba(247,244,236,0.40)",
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease,
            }}
          >
            <p
              className="
                text-[10px]
                uppercase tracking-[0.3em]
                sm:text-[11px]
              "
              style={{ color: palette.beige }}
            >
              Fecha límite para reconfirmar
            </p>

            <p
              className="
                mt-4 font-serif
                text-[26px]
                leading-tight
                sm:text-[32px]
              "
              style={{ color: palette.white }}
            >
              6 de noviembre
            </p>

            <p
              className="
                mt-2 font-serif
                text-[13px]
                tracking-[0.2em]
              "
              style={{ color: palette.ivory }}
            >
              2026
            </p>
          </motion.div>

          {/* INDICACIONES */}

          <motion.p
            className="
              mt-9
              font-serif
              text-[14px]
              leading-[1.95]
              sm:text-[16px]
            "
            style={{ color: palette.ivory }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.4,
              ease,
            }}
          >
            Te agradeceríamos mucho que
            completes el formulario que
            encontrarás a continuación.
            <br />
            <br />
            Si por alguna razón tus planes
            han cambiado, no te preocupes.
            Solo te pedimos que nos lo hagas
            saber para organizar correctamente
            los lugares.
          </motion.p>

          {/* DESPEDIDA */}

          <motion.div
            className="
              mt-10 flex flex-col
              items-center
            "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
          >
            <p
              className="
                font-cursiveDancing
                text-[36px]
                sm:text-[44px]
              "
              style={{ color: palette.white }}
            >
              ¡Muchas gracias!
            </p>

            <p
              className="
                mt-3 font-serif
                text-[10px]
                uppercase
                tracking-[0.25em]
                sm:text-[11px]
              "
              style={{ color: palette.beige }}
            >
              Con cariño, Eimy & Andre
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* INDICACIÓN FUERA DE LA TARJETA */}

      <motion.div
        className="
          mt-12 flex flex-col
          items-center gap-3
          text-center
        "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
      >
        <p
          className="
            font-serif
            text-[11px]
            uppercase
            tracking-[0.3em]
          "
          style={{ color: palette.olive }}
        >
          Desliza para reconfirmar
        </p>

        <motion.span
          className="text-2xl"
          style={{ color: palette.olive }}
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
