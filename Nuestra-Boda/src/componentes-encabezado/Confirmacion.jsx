
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwduCR9l2Z8IVPtC38HCtpFFhLu7mbrQ4DzPHEtuH-Kr_Mck8f6RkKWespYGBD-oNyQhw/exec";

const olive = "#3F4A2C";

function decodificarId(id) {
  const base64 = id.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
  const binario = atob(padded);
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0));
  const texto = new TextDecoder("utf-8").decode(bytes);

  for (const posible of [
    texto.split("").reverse().join(""),
    texto,
  ]) {
    try {
      const datos = JSON.parse(posible);
      if (datos && typeof datos === "object") return datos;
    } catch {
      // Intentar siguiente formato
    }
  }

  throw new Error("Enlace no válido");
}

export default function Confirmacion() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState(1);
  const [asistencia, setAsistencia] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [lado, setLado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [valido, setValido] = useState(false);

  const bloqueo = useRef(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      const datos = id
        ? decodificarId(id)
        : {
            nombre: params.get("nombre"),
            pases: params.get("pases"),
          };

      const n =
        typeof datos.nombre === "string"
          ? datos.nombre.trim()
          : "";

      const p = Number(
        datos.pases ??
        datos.invitados ??
        datos.cantidad ??
        datos.lugares
      );

      if (
        !n ||
        !Number.isSafeInteger(p) ||
        p < 1 ||
        p > 500
      ) {
        throw new Error("Datos inválidos");
      }

      setNombre(n);
      setPases(p);
      setCantidad(p);
      setValido(true);
    } catch {
      setError(
        "No pudimos leer tu enlace personalizado. Solicita uno nuevo a los novios."
      );
    }
  }, []);

  const opciones = useMemo(
    () => Array.from({ length: pases }, (_, i) => i + 1),
    [pases]
  );

  async function enviar(e) {
    e.preventDefault();

    if (bloqueo.current || enviado || !valido) return;

    if (!asistencia) {
      setError("Selecciona si asistirás.");
      return;
    }

    if (!lado) {
      setError("Selecciona con quién deseas confirmar.");
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > pases
      )
    ) {
      setError(`Selecciona entre 1 y ${pases} lugares.`);
      return;
    }

    setError("");
    bloqueo.current = true;
    setEnviando(true);

    const datos = {
      tipo: "reconfirmacion",
      nombre,
      asistencia,
      invitados:
        asistencia === "Sí asistiré" ? cantidad : 0,
      pasesAsignados: pases,
      mensaje: mensaje.trim(),
      lado,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datos),
      });

      setEnviado(true);
    } catch (e) {
      console.error(e);
      setError(
        "No se pudo enviar la solicitud. Comprueba tu conexión e inténtalo de nuevo."
      );
      bloqueo.current = false;
    } finally {
      setEnviando(false);
    }
  }

  const inputClass =
    "w-full border border-[#D7C8AA] bg-white px-4 py-3 text-[#292B24] outline-none focus:border-[#3F4A2C]";

  return (
    <section className="w-full bg-white px-4 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          mx-auto max-w-[660px]
          border border-[#D7C8AA]
          bg-[#F7F4EC] p-5
          text-center sm:p-10
        "
      >
        <p
          className="text-[10px] uppercase tracking-[0.32em]"
          style={{ color: olive }}
        >
          Eimy Edith & Andre Soni
        </p>

        <h2
          className="mt-4 font-serif text-3xl sm:text-4xl"
          style={{ color: olive }}
        >
          Reconfirma tu asistencia
        </h2>

        <div className="mx-auto my-7 h-px w-20 bg-[#D7C8AA]" />

        {!valido ? (
          <p
            role="alert"
            className="font-serif text-[#8B3A3A]"
          >
            {error || "Cargando invitación..."}
          </p>
        ) : enviado ? (
          <div className="py-10">
            <p
              className="font-serif text-2xl"
              style={{ color: olive }}
            >
              ¡Muchas gracias, {nombre}!
            </p>

            <p className="mt-4 font-serif leading-7 text-[#706E64]">
              Tu solicitud de reconfirmación fue enviada.
              Si necesitas corregir algún dato,
              comunícate con los novios.
            </p>
          </div>
        ) : (
          <form
            onSubmit={enviar}
            className="space-y-6 text-left"
          >
            <div className="border border-[#D7C8AA] bg-white p-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#706E64]">
                Invitación reservada para
              </p>

              <p
                className="mt-2 break-words font-serif text-2xl"
                style={{ color: olive }}
              >
                {nombre}
              </p>

              <p
                className="mt-2 font-serif text-sm"
                style={{ color: olive }}
              >
                {pases}{" "}
                {pases === 1
                  ? "lugar asignado"
                  : "lugares asignados"}
              </p>
            </div>

            <fieldset className="space-y-3">
              <legend
                className="mb-3 font-serif text-lg"
                style={{ color: olive }}
              >
                ¿Podremos contar contigo?
              </legend>

              {[
                "Sí asistiré",
                "No podré asistir",
              ].map((op) => (
                <label
                  key={op}
                  className="
                    flex cursor-pointer items-center gap-3
                    border border-[#D7C8AA]
                    bg-white p-4 font-serif
                  "
                >
                  <input
                    type="radio"
                    name="asistencia"
                    value={op}
                    checked={asistencia === op}
                    onChange={() => setAsistencia(op)}
                    className="accent-[#3F4A2C]"
                  />
                  {op}
                </label>
              ))}
            </fieldset>

            {asistencia === "Sí asistiré" && (
              <div>
                <label
                  htmlFor="cantidad-reconfirmacion"
                  className="mb-2 block font-serif"
                  style={{ color: olive }}
                >
                  ¿Cuántas personas asistirán?
                </label>

                <select
                  id="cantidad-reconfirmacion"
                  className={inputClass}
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Number(e.target.value))
                  }
                >
                  {opciones.map((n) => (
                    <option key={n} value={n}>
                      {n}{" "}
                      {n === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs text-[#706E64]">
                  Puedes reconfirmar hasta {pases} lugares.
                </p>
              </div>
            )}

            <fieldset className="space-y-3">
              <legend
                className="mb-3 font-serif text-lg"
                style={{ color: olive }}
              >
                ¿Con quién confirmas?
              </legend>

              {["Novia", "Novio"].map((op) => (
                <label
                  key={op}
                  className="
                    flex cursor-pointer items-center gap-3
                    border border-[#D7C8AA]
                    bg-white p-4 font-serif
                  "
                >
                  <input
                    type="radio"
                    name="lado"
                    value={op}
                    checked={lado === op}
                    onChange={() => setLado(op)}
                    className="accent-[#3F4A2C]"
                  />

                  {op === "Novia" ? "Eimy" : "Soni"}
                </label>
              ))}
            </fieldset>

            <div>
              <label
                htmlFor="mensaje-reconfirmacion"
                className="mb-2 block font-serif"
                style={{ color: olive }}
              >
                Mensaje para los novios (opcional)
              </label>

              <textarea
                id="mensaje-reconfirmacion"
                rows={4}
                maxLength={3000}
                className={inputClass}
                value={mensaje}
                onChange={(e) =>
                  setMensaje(e.target.value)
                }
                placeholder="Escribe un mensaje..."
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-[#8B3A3A]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="
                w-full px-6 py-4
                font-serif text-white
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              style={{ backgroundColor: olive }}
            >
              {enviando
                ? "Enviando..."
                : "Enviar reconfirmación"}
            </button>

            <p className="text-center text-xs leading-5 text-[#706E64]">
              Fecha solicitada para reconfirmar:
              15 de noviembre de 2026.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
