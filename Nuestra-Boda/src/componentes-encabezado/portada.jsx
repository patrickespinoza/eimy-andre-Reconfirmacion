
import React from "react";
import { motion } from "framer-motion";
import Countdown from "./encabeza-cuenta";
const palette = {
  oliveDark: "#303A22",
  white: "#FFFFFF",
};

const transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function Portada() {
  return (
    <section
      className="
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
      "
      style={{
        backgroundColor: palette.oliveDark,
      }}
    >
      {/* IMAGEN DE PORTADA */}
      <motion.img
        src="/portada.jpg"
        alt="Eimy Edith y Andre Soni"
        className="
          absolute inset-0
          h-full w-full
          object-cover object-center
        "
        initial={{ opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 1.1 },
          scale: { duration: 7, ease: "easeOut" },
        }}
      />

      {/* OSCURECIMIENTO UNIFORME */}
      <div className="absolute inset-0 bg-black/35" />

      {/* MARCO DECORATIVO */}
      <motion.div
        className="
          pointer-events-none
          absolute inset-4 z-10
          border sm:inset-7
        "
        style={{
          borderColor: "rgba(247,244,236,0.50)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div
        className="
          relative z-20
          flex min-h-[100dvh]
          w-full flex-col items-center
          px-7 pb-8 pt-10
          text-center
          sm:px-12 sm:pt-14
        "
      >
        {/* INICIALES */}
        <motion.div
          className="mt-3"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: 0.3,
          }}
        >
          <div
            className="
              relative mx-auto flex
              h-[100px] w-[120px]
              items-center justify-center
              sm:h-[125px] sm:w-[150px]
            "
            style={{ color: palette.white }}
          >
            <span
              className="
                absolute left-[15px] top-0
                font-serif text-[88px]
                font-normal leading-none
                sm:text-[108px]
              "
            >
              E
            </span>

            <span
              className="
                absolute right-[10px] top-0
                font-serif text-[88px]
                font-normal leading-none
                sm:text-[108px]
              "
            >
              S
            </span>
          </div>
        </motion.div>

        {/* NOMBRES */}
        <motion.h1
          className="
            mt-1 font-cursiveDancing
            text-[28px] leading-tight
            sm:text-[42px]
          "
          style={{
            color: palette.white,
            textShadow: "0 2px 12px rgba(0,0,0,0.30)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: 0.5,
          }}
        >
          Eimy Edith & Andre Soni
        </motion.h1>

        {/* FRASE */}
        <motion.p
          className="
            mt-5 max-w-[330px]
            font-serif text-[15px]
            italic leading-6
            sm:text-[17px]
          "
          style={{
            color: palette.white,
            textShadow: "0 2px 8px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: 0.7,
          }}
        >
          ¡Te elijo hoy y por el resto de mi vida!
        </motion.p>

        <div className="flex-1" />

        {/* CUENTA REGRESIVA */}
        <motion.div
          className="w-full max-w-[520px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: 0.9,
          }}
        >
          <Countdown
            targetDate="2026-11-27T17:00:00"
          />
        </motion.div>

        {/* INDICACIÓN PARA CONTINUAR */}
        <motion.p
          className="
            mt-6 text-[8px]
            uppercase tracking-[0.42em]
            sm:text-[9px]
          "
          style={{ color: palette.white }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{
            duration: 1,
            delay: 1.1,
          }}
        >
          Desliza para continuar
        </motion.p>
      </div>
    </section>
  );
}
